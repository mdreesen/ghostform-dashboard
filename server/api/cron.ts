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
    console.error('Vercel Cron automation step crashed:', error)
    throw createError({ 
      statusCode: 500, 
      message: error.message || 'Internal task handler fault.' 
    })
  }
})