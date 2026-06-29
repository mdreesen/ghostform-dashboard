import mongoose, { Schema } from 'mongoose';

const homeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  name: { type: String, required: false },
  address: { type: String, required: true },
  owner: { type: String, required: false },
  notes: { type: String, required: false }
}, { timestamps: true });
const HomeModel = mongoose.models.Home || mongoose.model("Home", homeSchema);

export { HomeModel as H };
//# sourceMappingURL=Home.mjs.map
