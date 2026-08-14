import mongoose, { Schema } from 'mongoose'

const campaignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: { type: String, required: true },
  targetStatus: { type: String, required: true }, // 'new', 'appointment', 'active', etc.
  subject: { type: String, required: true },
  messageBody: { type: String, required: true },
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 }, // 0 = Sun, 1 = Mon, etc.
  // Cadence: how often the campaign repeats.
  //   4 = weekly, 2 = biweekly (every other week), 1 = monthly (every 4 weeks)
  // Kept the field name for backwards-compat with existing saved campaigns.
  timesPerMonth: { type: Number, required: true, enum: [1, 2, 4], default: 1 },
  // Whether this campaign is currently sending. Lets realtors pause a
  // sequence without deleting it.
  active: { type: Boolean, default: true },
  lastFiredAt: { type: Date, default: null }
}, { timestamps: true })

// Strict protection guard against double-compilation crashes
export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema)
