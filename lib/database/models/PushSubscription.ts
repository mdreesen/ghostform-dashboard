import mongoose, { Schema } from 'mongoose'

/**
 * ============================================================================
 * PUSH SUBSCRIPTION
 * ============================================================================
 * One row per DEVICE, not per user. A realtor with a phone and a laptop has two.
 *
 * Subscriptions expire and get revoked without warning — the browser can drop
 * one whenever it likes. So a 404 or 410 from the push service means "delete
 * this row", not "something went wrong". Treating those as errors is how you
 * end up retrying dead endpoints forever.
 * ============================================================================
 */
const pushSubscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  // The endpoint is unique per device+browser and is the natural key.
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },

  /** So a realtor can tell "iPhone" from "MacBook" when revoking one. */
  label: { type: String, default: '' },

  /** What they actually want. Defaults are deliberately conservative. */
  prefs: {
    deadlines: { type: Boolean, default: true },   // overdue / due today
    briefing: { type: Boolean, default: true },    // the 7am summary
    newLeads: { type: Boolean, default: false }    // off by default — see below
  },

  lastSentAt: Date,
  failureCount: { type: Number, default: 0 }
}, { timestamps: true })

pushSubscriptionSchema.index({ userId: 1, endpoint: 1 })

export default mongoose.models.PushSubscription
  || mongoose.model('PushSubscription', pushSubscriptionSchema)
