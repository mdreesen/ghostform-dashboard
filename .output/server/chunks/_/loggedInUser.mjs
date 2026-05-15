import { d as defineEventHandler, h as requireUserSession, c as createError } from '../nitro/nitro.mjs';
import { c as connectDB } from './mongodb.mjs';
import { U as User$1 } from './User.mjs';

const User = User$1;
const loggedInUser = defineEventHandler(async (event) => {
  try {
    await connectDB();
    const { user } = await requireUserSession(event);
    const userEmail = user == null ? void 0 : user.email;
    const findUser = await User.find({ email: userEmail });
    if (findUser[0]) {
      return findUser[0];
    }
    ;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { loggedInUser as l };
//# sourceMappingURL=loggedInUser.mjs.map
