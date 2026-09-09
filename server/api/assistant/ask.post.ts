import { z } from 'zod'
import { useOpenAi } from '~/utils/ai/openAi/useOpenAi'
import { buildAssistantContext } from '~~/server/utils/assistantContext'
import loggedInUser from '~/utils/loggedInUser'

const bodySchema = z.object({
  question: z.string().min(2).max(600),
  /** Prior turns, so follow-ups work. Capped — this is a working assistant,
   *  not a place to hold a long conversation. */
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000)
  })).max(8).optional()
})

/**
 * POST /api/assistant/ask
 *
 * One question, answered against the realtor's own data.
 *
 * The rules in the prompt matter more than the model choice. An assistant that
 * invents a deadline is worse than no assistant — a realtor acting on a
 * hallucinated date has a real problem, and it's their liability.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { question, history } = await readValidatedBody(event, bodySchema.parse)
  const context = await buildAssistantContext(user._id)
  const today = new Date().toISOString().slice(0, 10)

  const prompt = [
    `You are the assistant inside GhostForm, a tool for a solo real estate agent.`,
    `Today is ${today}. You are talking to ${(user as any).name || 'the agent'}.`,
    ``,
    `ANSWER ONLY FROM THE DATA BELOW.`,
    `If the answer is not there, say so plainly — "I don't have that" is a good`,
    `answer. NEVER invent a date, a name, a price or a deadline. An agent acting`,
    `on something you made up has a real problem and it is their liability.`,
    ``,
    `Be brief. Two or three sentences unless they asked for a list. Write like a`,
    `capable assistant talking to a busy person, not like a chatbot — no`,
    `preamble, no "Great question!", no offering to help further.`,
    ``,
    `When you name a deadline, say which document it came from.`,
    `When you suggest contacting someone, say why now.`,
    ``,
    `FAIR HOUSING: never reference or infer family status, age, national origin,`,
    `religion, disability or race — including proxies like school districts or`,
    `"family-friendly" neighbourhoods. Discuss the transaction, never the person.`,
    ``,
    `You cannot take actions. If they ask you to send or change something, tell`,
    `them where in the app to do it.`,
    ``,
    `THEIR DATA:`,
    context || '  (no data yet)',
    ``,
    ...(history?.length
      ? ['EARLIER IN THIS CONVERSATION:', ...history.map((h) => `  ${h.role}: ${h.content}`), '']
      : []),
    `QUESTION: ${question}`
  ].join('\n')

  try {
    const answer = await useOpenAi(
      [{ role: 'user', content: prompt }],
      { maxTokens: 700, temperature: 0.2 }
    )
    if (!answer) throw new Error('empty response')
    return { answer: String(answer).trim() }
  } catch (err: any) {
    console.error('[assistant] failed:', err?.message)
    throw createError({ statusCode: 502, message: 'Could not answer that right now.' })
  }
})
