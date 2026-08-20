import mongoose, { Schema } from 'mongoose'

/**
 * A generated social post, moving through: draft → approved → posted.
 *
 * `status` and `platform` are modelled now — even though publishing is manual
 * (copy/paste) today — so that adding real auto-publishing later means writing
 * a publisher, not reshaping the data.
 */
const socialPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'x'],
    required: true
  },
  // What prompted this post — lets us avoid regenerating the same angle twice
  // and lets the UI group by theme.
  topic: { type: String, default: 'general' },
  body: { type: String, required: true },
  hashtags: { type: String, default: '' },
  // Suggestion for what image to pair with it (we don't generate images).
  imageIdea: { type: String, default: '' },

  status: {
    type: String,
    enum: ['draft', 'approved', 'posted', 'discarded'],
    default: 'draft',
    index: true
  },
  // Set when the realtor marks it posted (manually today, automatically later).
  postedAt: { type: Date, default: null },
  // Optional: when they intend to post it.
  scheduledFor: { type: Date, default: null }
}, { timestamps: true })

export default mongoose.models.SocialPost || mongoose.model('SocialPost', socialPostSchema)
