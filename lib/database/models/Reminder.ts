import mongoose, { Schema } from 'mongoose'

/**
 * ============================================================================
 * REMINDER
 * ============================================================================
 * Something the realtor asked to be reminded of, usually spoken.
 *
 * SEPARATE FROM DOCUMENT DEADLINES, deliberately. A deadline is extracted from
 * a contract and has legal weight; a reminder is "call the Chens Thursday".
 * Conflating them would mean a self-set nudge could be mistaken for a
 * contractual date, which is the one confusion worth avoiding here.
 *
 * They surface together in the daily briefing, because the realtor shouldn't
 * have to look in two places — but they stay distinguishable in the data.
 * ============================================================================
 */
const reminderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  text: { type: String, required: true },       // "Call the Chens about the inspection"
  dueAt: { type: Date, required: true, index: true },

  /** Optional context, when the note mentioned one. */
  homeId: { type: Schema.Types.ObjectId, ref: 'Home', index: true },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead', index: true },

  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },

  /**
   * Where this came from. A spoken reminder is a transcription of a
   * transcription — the AI heard what the browser heard — so it starts
   * unconfirmed for the same reason extracted dates do. Mishearing "Thursday"
   * as "Tuesday" is a missed call.
   */
  source: { type: String, enum: ['voice', 'typed'], default: 'typed' },
  confirmed: { type: Boolean, default: false },

  /** The exact words spoken, so they can check what we heard. */
  heardAs: { type: String, default: '' },

  completed: { type: Boolean, default: false },
  completedAt: Date,
  dismissed: { type: Boolean, default: false }
}, { timestamps: true })

reminderSchema.index({ userId: 1, dueAt: 1, completed: 1 })

export default mongoose.models.Reminder || mongoose.model('Reminder', reminderSchema)
