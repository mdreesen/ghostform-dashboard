import mongoose, { Schema } from 'mongoose'

/**
 * A spoken note, kept as a record.
 *
 * Even when a note produced a reminder or an answer, the original words are
 * worth keeping — "what did I say after that showing?" is a real question, and
 * an AI summary is not a substitute for what the realtor actually said.
 *
 * We store the TRANSCRIPT, never audio. Nothing to leak, nothing to retain.
 */
const voiceNoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  transcript: { type: String, required: true },

  /** What the AI decided this was. */
  intent: {
    type: String,
    enum: ['note', 'question', 'reminder', 'mixed', 'unclear'],
    default: 'note'
  },
  /** Its answer, when the note was a question. */
  answer: { type: String, default: '' },
  /** Reminders created from it. */
  reminderIds: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }],

  homeId: { type: Schema.Types.ObjectId, ref: 'Home', index: true },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead', index: true },

  status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'processing' },
  failureReason: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.models.VoiceNote || mongoose.model('VoiceNote', voiceNoteSchema)
