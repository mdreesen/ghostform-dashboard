import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { c as connectDB } from '../../../_/mongodb.mjs';
import { U as User$1 } from '../../../_/User.mjs';
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
import 'mongoose';

const User = User$1;
const bodySchema = z.object({
  password: z.string(),
  confirm_password: z.string(),
  token: z.string()
});
const reset = defineEventHandler(async (event) => {
  const { password, confirm_password, token } = await readValidatedBody(event, bodySchema.parse);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectDB();
    if (password !== confirm_password) throw createError({ statusCode: 401, statusMessage: "Try again" });
    await User.findOneAndUpdate({ resetPasswordToken: token }, {
      password: hashedPassword
    });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { reset as default };
//# sourceMappingURL=reset.mjs.map
