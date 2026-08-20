import { a as defineEventHandler, r as readValidatedBody, U as UserModelImport, b as createError } from '../../nitro/nitro.mjs';
import { z } from 'zod';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
import 'mongoose';
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
  name: z.string().nullable(),
  company: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  region: z.string().nullable(),
  calendar_link: z.string().nullable()
});
const index_put = defineEventHandler(async (event) => {
  const { name, company, phone, email, region, calendar_link } = await readValidatedBody(event, bodySchema.parse);
  const obj = {
    name,
    company,
    phone,
    email,
    region,
    calendar_link
  };
  try {
    const user = await loggedInUser(event);
    await User.findOneAndUpdate(
      { _id: user == null ? void 0 : user._id },
      { ...obj },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
