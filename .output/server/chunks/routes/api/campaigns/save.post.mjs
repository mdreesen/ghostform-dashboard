import { d as defineEventHandler, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
import mongoose, { Schema } from 'mongoose';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import '../../../_/mongodb.mjs';
import '../../../_/User.mjs';

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

const CampaignModel = CampaignModelImport;
const save_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({
      statusCode: 401,
      message: "Session trace missing or expired."
    });
  }
  const { title, targetStatus, subject, messageBody, dayOfWeek, timesPerMonth } = body;
  if (!targetStatus || !subject || !messageBody || dayOfWeek === void 0 || !timesPerMonth) {
    throw createError({
      statusCode: 400,
      message: "Missing required automated workflow properties."
    });
  }
  try {
    const campaign = await CampaignModel.create({
      userId: user._id,
      title: title || `${targetStatus.toUpperCase()} Automated Loop`,
      targetStatus,
      subject,
      messageBody,
      dayOfWeek: Number(dayOfWeek),
      timesPerMonth: Number(timesPerMonth),
      lastFiredAt: null
      // Explicitly initialize as empty queue window ready to fire
    });
    return {
      success: true,
      campaignId: campaign._id,
      message: "Dynamic workflow successfully written to tracking database."
    };
  } catch (error) {
    console.error("Campaign creation failed:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to instantiate database configuration profile."
    });
  }
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
