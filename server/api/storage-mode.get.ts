import { hasR2 } from '~/utils/storage'

/**
 * GET /api/storage-mode
 * Lets the UI say which driver is live. A silent local-disk mode is fine in
 * development and a serious problem in production, so it should be visible.
 */
export default defineEventHandler(() => ({ driver: hasR2() ? 'r2' : 'local' }))
