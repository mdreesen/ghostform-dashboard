import mongoose, { Schema } from 'mongoose';

const campaignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  title: { type: String, required: true },
  targetStatus: { type: String, required: true },
  // 'new', 'appointment', 'active', etc.
  subject: { type: String, required: true },
  messageBody: { type: String, required: true },
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
  // 0 = Sun, 1 = Mon, etc.
  timesPerMonth: { type: Number, required: true, enum: [1, 2, 4], default: 1 },
  lastFiredAt: { type: Date, default: null }
}, { timestamps: true });
const CampaignModelImport = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export { CampaignModelImport as C };
//# sourceMappingURL=Campaign.mjs.map
