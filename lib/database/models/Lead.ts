import mongoose, { Schema } from 'mongoose'

const leadSchema = new Schema({
    // Which property this lead is interested in. Optional — plenty of leads
    // aren't tied to a specific listing.
    homeId: { type: Schema.Types.ObjectId, ref: 'Home', index: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Vital index for instant dashboard lookup grouping
    },
    company_name: String, // Attach company name to lead
    company_email: String, // Attach compnay email to lead
    source: String,
    name: String,
    age: Number,
    email: String,
    phone: String, // Kept as string to preserve leading zeros or symbols safely
    best_communication_method: String,
    address: String,
    want_to_move: String,
    buy_sell_both: String,
    price: Number,
    sqft: Number,
    bedrooms: Number,
    bathrooms: Number,
    budget: Number,
    notes: String,
    seeing_an_agent: String,
    ai_analysis: Object,
    seen_at: String,
    /**
     * ------------------------------------------------------------------
     * STAGE — where this person is in the one journey they're on.
     * ------------------------------------------------------------------
     * The app previously split a single person across "Leads" and "Homes"
     * and a past-client concept that only existed in the briefing. Same
     * human, three places, nothing connecting them.
     *
     * One field instead. It moves in one direction, and each value answers
     * "what do I do next?" rather than describing a database state:
     *
     *   new           they signed in; call them
     *   working       you're in contact; qualify them
     *   showing       actively looking; find them houses
     *   under_contract  offer accepted; watch the deadlines
     *   past_client   closed; stay in touch
     *   lost          didn't happen; keep for the sphere anyway
     *
     * `status` is kept for the existing briefing logic rather than migrated
     * in one go — moving both at once is how you break a working morning
     * list.
     */
    stage: {
      type: String,
      enum: ['new', 'working', 'showing', 'under_contract', 'past_client', 'lost'],
      default: 'new',
      index: true
    },

    /**
     * ------------------------------------------------------------------
     * EMAIL CONSENT
     * ------------------------------------------------------------------
     * CAN-SPAM requires a working opt-out in every commercial email and
     * that it be honoured within 10 business days. The realtor is the
     * sender; GhostForm is the machine that sends. Without this field a
     * "stop emailing me" reply goes to their inbox and the cron sends
     * again on Monday regardless.
     *
     * Checked in the campaign query, so an unsubscribe takes effect on the
     * next run rather than needing anyone to act on it.
     */
    unsubscribedAt: { type: Date, default: null, index: true },
    /** Set from a Resend webhook. A hard bounce or spam complaint must stop
     *  sending immediately — the sending domain is shared across every
     *  realtor on the platform, so one bad list hurts all of them. */
    emailSuppressedAt: { type: Date, default: null, index: true },
    emailSuppressedReason: { type: String, default: '' },

    status: { type: String, default: 'new' },

    /**
     * ------------------------------------------------------------------
     * SPHERE — the past-client side of the business.
     * ------------------------------------------------------------------
     * 76% of buyers say they'd use their agent again. Around 12% do. That
     * gap lives entirely in the months after closing, and it's the largest
     * money leak in the industry.
     *
     * A past client is not a separate object — it's this lead, closed. Same
     * record, same history, so nothing has to be re-entered at the moment the
     * relationship actually becomes valuable.
     */
    closedAt: { type: Date, index: true },
    closedAddress: { type: String, default: '' },

    /**
     * Things you know about them as PEOPLE, not as a transaction.
     *
     * This is the data that makes sphere nurture work and that nobody ever
     * types — "second kid on the way", "his mother is in Whitefish", "hated
     * the commute". Captured by speaking, because a form for this would stay
     * empty forever.
     *
     * Each carries the words it came from, so a call opens with something
     * true rather than something generic.
     */
    sphereNotes: [{
      text: { type: String, required: true },
      capturedAt: { type: Date, default: Date.now },
      source: { type: String, enum: ['voice', 'typed'], default: 'typed' }
    }],

    /** Last time you actually reached out — not last time the system emailed. */
    lastTouchAt: { type: Date, index: true },

    /** How often this person is worth hearing from. Months. */
    touchEveryMonths: { type: Number, default: 4 },

    date: { type: String, default: () => new Date().toISOString() },
    reminderSent: { type: Boolean, default: false },
    reminderStatus: {
        type: String,
        enum: ['none', 'scheduled', 'sent'],
        default: 'none' // 'none' means automation is disabled for this specific lead
      },
      reminderScheduledAt: {
        type: Date,
        required: false
      },
      lastContactedAt: Date,

    // Deep-dive questionnaire answers. Written by THIS app and read by the
    // dashboard — both share one database, so there is no cross-origin call
    // and no CORS involved.
    qualification: {
      sentAt: Date,
      completedAt: Date,
      intent: String,
      answers: { type: Object, default: {} }
    }
}, { timestamps: true }) // Automates true createdAt/updatedAt tracking lines

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema)