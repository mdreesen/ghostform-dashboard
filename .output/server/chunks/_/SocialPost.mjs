import mongoose, { Schema } from 'mongoose';

const socialPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  platform: {
    type: String,
    enum: ["facebook", "instagram", "x"],
    required: true
  },
  // What prompted this post — lets us avoid regenerating the same angle twice
  // and lets the UI group by theme.
  topic: { type: String, default: "general" },
  body: { type: String, required: true },
  hashtags: { type: String, default: "" },
  // Suggestion for what image to pair with it (we don't generate images).
  imageIdea: { type: String, default: "" },
  status: {
    type: String,
    enum: ["draft", "approved", "posted", "discarded"],
    default: "draft",
    index: true
  },
  // Set when the realtor marks it posted (manually today, automatically later).
  postedAt: { type: Date, default: null },
  // Optional: when they intend to post it.
  scheduledFor: { type: Date, default: null }
}, { timestamps: true });
const SocialPostModel = mongoose.models.SocialPost || mongoose.model("SocialPost", socialPostSchema);

export { SocialPostModel as S };
//# sourceMappingURL=SocialPost.mjs.map
