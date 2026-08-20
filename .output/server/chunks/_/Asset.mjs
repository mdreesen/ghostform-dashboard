import mongoose, { Schema } from 'mongoose';

const assetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  kind: {
    type: String,
    enum: ["headshot", "logo"],
    default: "headshot",
    index: true
  },
  mime: { type: String, default: "image/jpeg" },
  /** Raw base64 (no data: prefix) */
  data: { type: String, required: true },
  bytes: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
}, { timestamps: true });
assetSchema.index({ userId: 1, kind: 1 }, { unique: true });
const AssetModel = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export { AssetModel as A };
//# sourceMappingURL=Asset.mjs.map
