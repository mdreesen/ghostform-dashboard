import { a as defineEventHandler, r as readValidatedBody, c as connectDB, U as UserModelImport, e as setUserSession, b as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import 'mongoose';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

const User = UserModelImport;
const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8)
});
const login_post = defineEventHandler(async (event) => {
  var _a;
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  try {
    await connectDB();
    const user = await User.findOne({ email });
    const passwordMatches = bcrypt.compare(password, (_a = user == null ? void 0 : user.password) != null ? _a : "");
    if (await passwordMatches) {
      await setUserSession(event, {
        user: {
          _id: user == null ? void 0 : user._id,
          company: (user == null ? void 0 : user.company) || "",
          company_hashed: (user == null ? void 0 : user.company_hashed) || "",
          role: (user == null ? void 0 : user.role) || "",
          category: (user == null ? void 0 : user.category) || "",
          category_hashed: (user == null ? void 0 : user.category_hashed) || "",
          qr_code_slug: (user == null ? void 0 : user.qr_code_slug) || "",
          total_scans: (user == null ? void 0 : user.total_scans) || "",
          leads_captured: (user == null ? void 0 : user.leads_captured) || "",
          first_name: (user == null ? void 0 : user.first_name) || "",
          last_name: (user == null ? void 0 : user.last_name) || "",
          email: (user == null ? void 0 : user.email) || "",
          email_hashed: (user == null ? void 0 : user.email_hashed) || "",
          phone: (user == null ? void 0 : user.phone) || "",
          password: (user == null ? void 0 : user.password) || "",
          street_address: (user == null ? void 0 : user.street_address) || "",
          city: (user == null ? void 0 : user.city) || "",
          country: (user == null ? void 0 : user.country) || "",
          postal_code: (user == null ? void 0 : user.postal_code) || "",
          reset_password_token: (user == null ? void 0 : user.reset_password_token) || "",
          privacy_policy: (user == null ? void 0 : user.privacy_policy) || "",
          paid: (user == null ? void 0 : user.paid) || "",
          paid_tier: (user == null ? void 0 : user.paid_tier) || "",
          // leads: [lead] || '',
          createdAt: (user == null ? void 0 : user.createdAt) || "",
          updatedAt: (user == null ? void 0 : user.updatedAt) || ""
        }
      });
    } else {
      throw createError({ statusCode: 401, statusMessage: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
