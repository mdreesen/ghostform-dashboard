import { a as defineEventHandler, r as readValidatedBody, c as connectDB, U as UserModelImport, b as createError, g as sendWelcomeEmail } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
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
  company: z.string(),
  category: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  privacy_policy: z.boolean()
});
const signup_post = defineEventHandler(async (event) => {
  const { company, category, email, password, confirm_password, privacy_policy } = await readValidatedBody(event, bodySchema.parse);
  try {
    await connectDB();
    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedEmail = await bcrypt.hash(email, 15);
    const hashedCompany = await bcrypt.hash(company, 15);
    const hashedCategory = await bcrypt.hash(category, 15);
    if (!password) throw createError({ statusCode: 401, statusMessage: "Please insert password.", data: { errorMessage: "The requested item could not be found." } });
    if (!password && !confirm_password) throw createError({ statusCode: 401, statusMessage: "Please insert password.", data: { errorMessage: "The requested item could not be found." } });
    if (password !== confirm_password) throw createError({ statusCode: 401, statusMessage: "Passwords do not match.", data: { errorMessage: "The requested item could not be found." } });
    if (user) throw createError({ statusCode: 401, statusMessage: "User already registered.", data: { errorMessage: "The requested item could not be found." } });
    const registerUser = new User({
      company: company.toLowerCase(),
      company_hashed: hashedCompany.trim(),
      category: category.toLowerCase(),
      category_hashed: hashedCategory.trim(),
      email: email.toLowerCase().trim(),
      email_hashed: hashedEmail.trim(),
      password: hashedPassword,
      privacy_policy
    });
    await registerUser.save();
    const sent = await sendWelcomeEmail(email.toLowerCase().trim(), company);
    if (!sent) {
      console.error("[signup] Account created but welcome email did not send:", email);
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: "Please try again."
    });
  }
});

export { signup_post as default };
//# sourceMappingURL=signup.post.mjs.map
