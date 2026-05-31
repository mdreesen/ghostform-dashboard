// Test timestamp
// 2026-05-31T03:53:07.845+00:00

export default defineEventHandler(async (event) => {
    // Check that we are running locally to prevent accidental production loops
    if (process.env.NODE_ENV !== 'development') {
      throw createError({ statusCode: 403, message: 'Forbidden outside dev mode.' })
    }
  
    try {
      console.log('Forcing trigger signature on lead:reminders task payload...')
      
      // Explicitly invoke your Nitro scheduled task programmatically on-demand
      const taskResult = await runTask('lead:reminders')
      
      return {
        success: true,
        message: 'Nitro task invoked successfully.',
        taskResult
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  })