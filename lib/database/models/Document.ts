import mongoose, { Schema } from 'mongoose'

/**
 * ============================================================================
 * DOCUMENT
 * ============================================================================
 * Any file a realtor needs for a property or a lead — purchase agreements,
 * inspection reports, listing agreements, disclosures, addenda, repair
 * estimates. No assumed schema, because the realtor decides what belongs here.
 *
 * ASSUME EVERY DOCUMENT IS SENSITIVE.
 * These routinely contain client financials, signatures, home addresses and
 * occasionally identifiers. So:
 *   - the file lives in object storage, never in Mongo
 *   - we store extracted DATES and a short summary, not the full text
 *   - nothing is logged beyond an id
 *   - access is scoped to the owning user on every read
 * ============================================================================
 */

const deadlineSchema = new Schema({
  label: { type: String, required: true },      // "Inspection contingency expires"
  date: { type: Date, required: true },

  /**
   * The sentence this came from, quoted verbatim.
   *
   * Non-negotiable. A misread contingency date is a real financial loss and
   * it's the agent's liability — so every extracted date shows its source and
   * must be confirmed before it becomes a reminder.
   */
  sourceText: { type: String, default: '' },

  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },

  /** Extracted dates are proposals until a human agrees. */
  confirmed: { type: Boolean, default: false },
  dismissed: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true })

const documentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  // A document belongs to a property, a lead, or both.
  homeId: { type: Schema.Types.ObjectId, ref: 'Home', index: true },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead', index: true },

  filename: { type: String, required: true },
  storageKey: { type: String, required: true },
  mime: { type: String, default: '' },
  bytes: { type: Number, default: 0 },

  /** What the AI decided this is. Free text — we don't constrain the set. */
  docType: { type: String, default: '' },
  /** Two or three lines. Not the full text — see the note above. */
  summary: { type: String, default: '' },

  deadlines: [deadlineSchema],

  status: {
    type: String,
    enum: ['uploaded', 'reading', 'ready', 'failed'],
    default: 'uploaded',
    index: true
  },
  failureReason: { type: String, default: '' },

  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true })

documentSchema.index({ userId: 1, homeId: 1 })

export default mongoose.models.Document || mongoose.model('Document', documentSchema)
