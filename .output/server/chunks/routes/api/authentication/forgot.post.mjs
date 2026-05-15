import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { c as connectDB } from '../../../_/mongodb.mjs';
import { U as User$1 } from '../../../_/User.mjs';
import { nanoid } from 'nanoid';
import { Resend } from 'resend';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'mongoose';

const User = User$1;
const bodySchema = z.object({
  email: z.email(),
  question: z.string()
});
const forgot_post = defineEventHandler(async (event) => {
  const { email, question } = await readValidatedBody(event, bodySchema.parse);
  const token = nanoid(32);
  const htmlBody = `
    <div>
        <h1>Welcome to Ascend</h1>
        <a href="${process.env.PROJECT_DOMAIN}/${token}/resetpassword">Click here to reset password</a>
    </div>
    `;
  try {
    await connectDB();
    if (question !== "7") throw createError({ statusCode: 401, statusMessage: "Try again" });
    else {
      const userFound = await User.findOne({ email });
      if (!userFound) throw createError({ statusCode: 401, statusMessage: "Wrong credentials" });
      const resend = new Resend(`${process.env.RESEND_KEY}`);
      await resend.emails.send({
        from: "NoReply@ascendpod.com",
        to: [email],
        subject: "Reset your password",
        // Subject line
        html: htmlBody
      });
      await User.findOneAndUpdate({ email: email.toLowerCase().trim() }, { resetPasswordToken: token });
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { forgot_post as default };
//# sourceMappingURL=forgot.post.mjs.map
