import { z } from 'zod';

const EnvSchema = z.object({
    MONGO_URI: z.string(),
    RESEND_KEY: z.string(),
    PROJECT_DOMAIN: z.string(),
    NUXT_SESSION_PASSWORD: z.string()
});

export type EnvSchema = z.infer<typeof EnvSchema>;

export default EnvSchema.parse(process.env);