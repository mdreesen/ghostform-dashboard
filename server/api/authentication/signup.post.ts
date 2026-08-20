import { z } from 'zod';
import bcrypt from 'bcrypt';
import { connectDB } from "../../../lib/database/mongodb";
import { sendWelcomeEmail } from '~~/server/utils/welcomeEmail';
import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

const bodySchema = z.object({
  company: z.string(),
  category: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  privacy_policy: z.boolean(),
})

export default defineEventHandler(async (event) => {
  const { company, category, email, password, confirm_password, privacy_policy } = await readValidatedBody(event, bodySchema.parse);

  try {
    await connectDB();

    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedEmail = await bcrypt.hash(email, 15);
    const hashedCompany = await bcrypt.hash(company, 15);
    const hashedCategory = await bcrypt.hash(category, 15);

    if (!password) throw createError({ statusCode: 401, statusMessage: 'Please insert password.', data: { errorMessage: 'The requested item could not be found.' } });
    if (!password && !confirm_password) throw createError({ statusCode: 401, statusMessage: 'Please insert password.', data: { errorMessage: 'The requested item could not be found.' } });
    if (password !== confirm_password) throw createError({ statusCode: 401, statusMessage: 'Passwords do not match.', data: { errorMessage: 'The requested item could not be found.' } });
    if (user) throw createError({ statusCode: 401, statusMessage: 'User already registered.', data: { errorMessage: 'The requested item could not be found.' } });

    const registerUser = new User({
      company: company.toLowerCase(),
      company_hashed: hashedCompany.trim(),
      category: category.toLowerCase(),
      category_hashed: hashedCategory.trim(),
      email: email.toLowerCase().trim(),
      email_hashed: hashedEmail.trim(),
      password: hashedPassword,
      privacy_policy: privacy_policy,
    });

    await registerUser.save();

    // Welcome email — fired after the account exists, and deliberately NOT
    // awaited into the try/catch's failure path: sendWelcomeEmail never throws,
    // so a mail problem can't turn a successful signup into an error the user
    // sees. Worst case they get an account with no welcome email, which we log.
    const sent = await sendWelcomeEmail(email.toLowerCase().trim(), company);
    if (!sent) {
      console.error('[signup] Account created but welcome email did not send:', email);
    }

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: 'Please try again.'
    });
  };
});