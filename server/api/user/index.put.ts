import { z } from 'zod';
import loggedInUser from "~/utils/loggedInUser";

import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

const bodySchema = z.object({
    username: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable()
})

export default defineEventHandler(async (event) => {
    const { name, company, phone, email, } = await readValidatedBody(event, bodySchema.parse);

    const obj = {
        username: username,
        first_name: first_name,
        last_name: last_name
    };

    try {
        const user = await loggedInUser(event);

        await User.findOneAndUpdate(
            { _id: user?._id },
            { ...obj },
            { new: true });

    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 401,
            message: 'Please try again'
        });
    };
});
