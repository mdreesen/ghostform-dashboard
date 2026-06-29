import { Model } from 'mongoose';

import loggedInUser from '~/utils/loggedInUser';
import HomeModel from '../../../lib/database/models/Home';
import type { Home } from '~/types/home';

const Home = HomeModel as Model<Home>;

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const data = await Home.find({ userId: user?._id })
      .sort({ createdAt: -1 }) // Yields real-time entries newest-first
      .lean();

    return data
  });