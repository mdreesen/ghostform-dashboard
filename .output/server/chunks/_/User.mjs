import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

const EnvSchema = z.object({
  MONGO_URI: z.string(),
  RESEND_KEY: z.string(),
  PROJECT_DOMAIN: z.string(),
  NUXT_SESSION_PASSWORD: z.string()
});
const env = EnvSchema.parse(process.env);

mongoose.connect(`${env.MONGO_URI}`);
mongoose.Promise = global.Promise;
const lead = new Schema(
  {
    name: String || void 0,
    email: String || void 0,
    phone: String || void 0,
    age: Number || void 0,
    address: String || void 0,
    ai_analysis: String || void 0,
    status: String || void 0,
    date: String || void 0,
    // Construction Data
    goal: String || void 0,
    // Realtor Data
    want_to_move: String || void 0,
    buy_sell_both: String || void 0,
    price: Number || void 0,
    sqft: Number || void 0,
    bedrooms: Number || void 0,
    bathrooms: Number || void 0,
    budget: Number || void 0,
    message: String || void 0
  },
  { timestamps: false }
);
const userSchema = new Schema(
  {
    company: String,
    company_hashed: String,
    role: String,
    category: String,
    category_hashed: String,
    qr_code_slug: String,
    total_scans: Number,
    leads_captured: Number,
    first_name: String,
    last_name: String,
    email: String,
    email_hashed: String,
    phone: String,
    password: String,
    street_address: String,
    city: String,
    country: String,
    postal_code: String,
    reset_password_token: String,
    privacy_policy: Boolean,
    paid: Boolean,
    paid_tier: String,
    leads: [lead],
    createdAt: String,
    updatedAt: String
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User as U };
//# sourceMappingURL=User.mjs.map
