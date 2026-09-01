import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function useOpenAi(
  messages: Array<any>,
  /**
   * Optional. The original callers are short narration and drafts, where the
   * default is fine. Structured extraction (voice intent) returns JSON that
   * can be longer — and a truncated response parses as a failure, silently
   * losing a reminder. Optional so the four existing call sites are unchanged.
   */
  options?: { maxTokens?: number; temperature?: number }
): Promise<string | null> {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      ...(options?.maxTokens ? { max_tokens: options.maxTokens } : {}),
      ...(options?.temperature !== undefined ? { temperature: options.temperature } : {})
    });
    const text = res?.choices?.[0]?.message?.content
    return typeof text === 'string' && text.trim() ? text.trim() : null
  } catch (err) {
    console.error('OpenAI failed', err)
    return null
  }
}