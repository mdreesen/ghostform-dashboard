/**
 * A 24-character hex string is the only thing Mongoose will accept as an
 * ObjectId. Anything else — most commonly the literal string "undefined" from
 * a template literal like `${maybe?._id}` — throws:
 *
 *   Cast to ObjectId failed for value "undefined" (type string)
 *
 * That error is a 500 and tells the user nothing. Checking first turns it into
 * an honest 400.
 */
export function isObjectId(v: unknown): boolean {
  return typeof v === 'string' && /^[a-f\d]{24}$/i.test(v)
}
