import { a as defineEventHandler, i as readBody, b as createError } from '../../../nitro/nitro.mjs';
import { C as CampaignModelImport } from '../../../_/Campaign.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import 'mongoose';
import 'openai';
import 'resend';
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

const Campaign = CampaignModelImport;
const save_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({
      statusCode: 401,
      message: "Session trace missing or expired."
    });
  }
  const { title, targetStatus, subject, messageBody, dayOfWeek, timesPerMonth, varyWording } = body;
  if (!targetStatus || !subject || !messageBody || dayOfWeek === void 0 || !timesPerMonth) {
    throw createError({
      statusCode: 400,
      message: "Missing required automated workflow properties."
    });
  }
  try {
    const campaign = await Campaign.create({
      userId: user._id,
      title: title || `${targetStatus.toUpperCase()} Automated Loop`,
      targetStatus,
      subject,
      messageBody,
      dayOfWeek: Number(dayOfWeek),
      timesPerMonth: Number(timesPerMonth),
      // Default ON: repeated identical copy reads as a robot and hurts
      // deliverability. Realtors can opt out per campaign.
      varyWording: varyWording !== false,
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
