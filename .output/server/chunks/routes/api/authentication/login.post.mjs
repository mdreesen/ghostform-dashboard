import { d as defineEventHandler, r as readValidatedBody, s as setUserSession, c as createError } from '../../../nitro/nitro.mjs';
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
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'mongoose';

const User = User$1;
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
          username: (user == null ? void 0 : user.username) || "",
          first_name: (user == null ? void 0 : user.first_name) || "Ascender",
          last_name: (user == null ? void 0 : user.last_name) || "",
          name: `${user == null ? void 0 : user.first_name} ${user == null ? void 0 : user.last_name}` || "Ascender",
          email: user == null ? void 0 : user.email,
          phone: (user == null ? void 0 : user.phone) || "",
          country: (user == null ? void 0 : user.country) || "",
          street_address: (user == null ? void 0 : user.street_address) || "",
          city: (user == null ? void 0 : user.city) || "",
          region: (user == null ? void 0 : user.region) || "",
          postal_code: (user == null ? void 0 : user.postal_code) || ""
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
