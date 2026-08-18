import { a as defineEventHandler, c as connectDB, p as requireUserSession, U as UserModel, b as createError } from '../nitro/nitro.mjs';

const User = UserModel;
const loggedInUser = defineEventHandler(async (event) => {
  await connectDB();
  const { user } = await requireUserSession(event);
  const userEmail = user == null ? void 0 : user.email;
  try {
    const findUser = await User.findOne({ email: userEmail });
    if (!findUser) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    return findUser;
  } catch (error) {
    if (error == null ? void 0 : error.statusCode) throw error;
    console.error("loggedInUser lookup failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { loggedInUser as l };
//# sourceMappingURL=loggedInUser.mjs.map
