import mongoose, { Schema } from 'mongoose'

const homeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: { type: String, required: false },
  address: { type: String, required: true },
  owner: { type: String, required: false },
  notes: { type: String, required: false },
}, { timestamps: true })

// Strict protection guard against double-compilation crashes
export default mongoose.models.Home || mongoose.model('Home', homeSchema)