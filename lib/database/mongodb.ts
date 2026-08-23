import mongoose from 'mongoose'

/**
 * ============================================================================
 * MONGODB CONNECTION (serverless-safe)
 * ============================================================================
 * The previous version called `mongoose.connect()` on EVERY request. In a
 * serverless environment (Vercel) that means every invocation opens a new
 * connection and re-resolves the Atlas SRV record. DNS starts refusing the
 * repeated lookups, which surfaces as:
 *
 *   getaddrinfo ENOTFOUND ac-xxxxx-shard-00-00.xxxxx.mongodb.net
 *
 * It also leaks connections until the Atlas connection limit is hit.
 *
 * The fix is the standard serverless pattern: cache the connection PROMISE on
 * globalThis so a warm container reuses one connection, and concurrent calls
 * during a cold start all await the same in-flight connect rather than each
 * starting their own.
 * ============================================================================
 */

const MONGO_URI = process.env.MONGO_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Survives module re-evaluation within the same warm container.
const globalCache = globalThis as unknown as { _mongoose?: MongooseCache }
const cached: MongooseCache = globalCache._mongoose ?? { conn: null, promise: null }
globalCache._mongoose = cached

export const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set. Check your environment variables.')
  }

  // Already connected and healthy — reuse it.
  if (cached.conn && mongoose.connection.readyState === 1) {
    return true
  }

  // A connect is already in flight (cold start, concurrent requests) — wait
  // for that one instead of opening another.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // Don't queue operations forever if the connection is down; fail fast
      // so the caller gets a real error instead of hanging.
      bufferCommands: false,
      // Keep the pool small — serverless containers are short-lived and a
      // large pool per container exhausts the Atlas limit quickly.
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      // Retry a dropped write once rather than surfacing a transient blip.
      retryWrites: true
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    // Clear the failed promise so the NEXT request retries rather than
    // awaiting a permanently-rejected promise forever.
    cached.promise = null
    console.error('[db] connection failed:', (error as Error)?.message)
    throw error
  }

  return true
}
