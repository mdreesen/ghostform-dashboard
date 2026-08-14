import { connectDB } from '../../lib/database/mongodb';
import { Model } from 'mongoose';
import UserModel from '../../lib/database/models/User';
import type { User } from '~/types/user';
import type { H3Event } from 'h3';

const UserDoc = UserModel as Model<User>;

// Statuses that grant access to paid features.
const ACTIVE_STATUSES = new Set(['active', 'trialing']);

/**
 * Server-side subscription enforcement.
 *
 * Returns the user document if they're logged in AND have an active
 * subscription. Throws 401 if not logged in, 402 (Payment Required) if
 * logged in but unsubscribed. Client middleware handles the redirect UX;
 * THIS is what actually protects the data, since the API can be hit directly.
 *
 * Auto-imported by Nitro (lives in server/utils).
 */
export default async function requirePaidUser(event: H3Event) {
  await connectDB();

  const { user } = await requireUserSession(event); // throws 401 if no session
  const email = (user as User)?.email;

  const dbUser = await UserDoc.findOne({ email });
  if (!dbUser) {
    throw createError({ statusCode: 401, statusMessage: 'User not found.' });
  }

  const status = (dbUser as any).subscriptionStatus;
  const isActive = ACTIVE_STATUSES.has(status) || (dbUser as any).paid === true;

  if (!isActive) {
    throw createError({
      statusCode: 402,
      statusMessage: 'An active subscription is required.'
    });
  }

  return dbUser;
}
