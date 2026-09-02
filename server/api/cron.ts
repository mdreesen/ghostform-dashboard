import { runTask } from 'nitropack/runtime/task'

export default defineEventHandler(async (event) => {
  // 1. Grab the incoming system cron token from Vercel headers
  const authHeader = getHeader(event, 'Authorization')
  
  // 2. Validate that it matches our system environment variable secret
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({ 
      statusCode: 401, 
      message: 'Unauthorized system execution footprint.' 
    })
  }

  try {
    console.log('Vercel Cron triggered: Executing background task engine...')
    
    // 3. Programmatically trigger the lead:reminders task we already wrote
    const taskResult = await runTask('lead:reminders')
    
    return { 
      success: true, 
      executedAt: new Date().toISOString(),
      ...taskResult 
    }
  } catch (error: any) {
    const msg = String(error?.message || '')

    // "Task is not available" means Nitro never registered it, which is a
    // CONFIG problem, not a failure inside the task. Saying so directly saves
    // hunting through task code that was never reached.
    if (/is not available/i.test(msg)) {
      console.error('[cron] Task not registered. Check nitro.experimental.tasks is true in nuxt.config.ts.')
      throw createError({
        statusCode: 500,
        message: 'Task not registered — nitro.experimental.tasks must be enabled.'
      })
    }

    console.error('[cron] task failed:', msg, error?.stack)
    throw createError({
      statusCode: 500,
      message: msg || 'Internal task handler fault.'
    })
  }
})