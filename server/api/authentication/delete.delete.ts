import loggedInUser from '~/utils/loggedInUser';

import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

export default defineEventHandler(async (event) => {

    try {
        const user = await loggedInUser(event);

        await User.deleteOne({ email: user?.email });

    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 401,
            statusMessage: 'Please try again.'
        });
    };
});