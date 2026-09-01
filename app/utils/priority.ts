/**
 * ============================================================================
 * PRIORITY
 * ============================================================================
 * Red / amber / green, as asked — but never colour ALONE.
 *
 * Around 8% of men have some form of colour vision deficiency, and red/green
 * is the most common confusion. A realtor squinting at a phone in a truck is
 * also not in ideal viewing conditions. So every priority carries three
 * signals: hue, shape, and a word. Any one of them alone is enough to read it.
 *
 * The hues are tuned to GhostForm's warm palette rather than pure traffic-light
 * — a #FF0000 next to #B5563A terracotta looks like a bug, not a warning.
 * ============================================================================
 */

export type Priority = 'high' | 'medium' | 'low'

export interface PriorityStyle {
  value: Priority
  label: string          // the word — always shown
  hint: string
  color: string          // border / text
  bg: string             // tinted background
  shape: 'filled' | 'half' | 'hollow'
}

export const PRIORITIES: Record<Priority, PriorityStyle> = {
  high: {
    value: 'high',
    label: 'Do now',
    hint: 'Today or already overdue',
    color: '#C0392B',       // warm red, sits with the terracotta
    bg: '#FBEDEA',
    shape: 'filled'
  },
  medium: {
    value: 'medium',
    label: 'This week',
    hint: 'Coming up — plan for it',
    color: '#C08A2E',       // amber, not yellow — yellow on cream is unreadable
    bg: '#FBF3E4',
    shape: 'half'
  },
  low: {
    value: 'low',
    label: 'No rush',
    hint: 'Far enough out to leave alone',
    color: '#5A6349',       // the existing moss green
    bg: '#EDF0E7',
    shape: 'hollow'
  }
}

/**
 * URGENCY IS NOT THE SAME AS STAKES.
 *
 * The original version conflated them: it took the AI's priority (which
 * measures CONSEQUENCE — "missing this loses the deal") and displayed it as
 * urgency ("Do now"). So a high-stakes closing three weeks out screamed DO NOW,
 * and anything within two days was force-escalated regardless.
 *
 * They're independent:
 *   - WHEN must I act?  → the date. This drives the label and the colour.
 *   - HOW BAD if I miss? → the AI's priority. This breaks ties and adds a mark.
 *
 * A realtor scanning this needs "when", because that's what orders their day.
 */
export function effectivePriority(date: Date | string, assigned: Priority): Priority {
  const days = daysUntil(date)
  if (days === null) return assigned

  // Overdue or today — genuinely act now, whatever the stakes.
  if (days <= 0) return 'high'

  // Tomorrow is close enough to act on today for something consequential.
  if (days <= 1) return assigned === 'high' ? 'high' : 'medium'

  // The rest of the week is "this week", not "now" — for ANY stakes. Calling a
  // five-day-out deadline "Do now" is the overpromise that makes people stop
  // trusting the colour, and then they miss the one that really is now.
  if (days <= 7) return 'medium'

  // Beyond a week nothing is urgent, however big. A closing in 30 days is
  // important and NOT something to drop today's work for — showing it as
  // urgent trains people to ignore the colour entirely.
  if (days <= 21) return assigned === 'high' ? 'medium' : 'low'
  return 'low'
}

/**
 * Does this carry high consequence, regardless of when it's due?
 * Lets the UI mark a far-off closing as important without making it look
 * urgent — the distinction the old version lost.
 */
export function isHighStakes(assigned: Priority): boolean {
  return assigned === 'high'
}

export function daysUntil(date: Date | string): number | null {
  const t = new Date(date).getTime()
  if (Number.isNaN(t)) return null
  const start = new Date(); start.setHours(0, 0, 0, 0)
  return Math.round((new Date(t).setHours(0, 0, 0, 0) - start.getTime()) / 86400000)
}

/** Human phrasing. "in 3 days" beats a date someone has to compute from. */
export function whenLabel(date: Date | string): string {
  const d = daysUntil(date)
  if (d === null) return ''
  if (d < -1) return `${Math.abs(d)} days overdue`
  if (d === -1) return 'Overdue since yesterday'
  if (d === 0) return 'Today'
  if (d === 1) return 'Tomorrow'
  if (d <= 7) return `In ${d} days`
  if (d <= 14) return 'Next week'
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** Sort for the daily list: overdue first, then soonest, then priority. */
export function sortDeadlines<T extends { date: Date | string; priority: Priority; completed?: boolean }>(
  items: T[]
): T[] {
  const rank = { high: 0, medium: 1, low: 2 }
  return [...items].sort((a, b) => {
    if (!!a.completed !== !!b.completed) return a.completed ? 1 : -1
    const da = daysUntil(a.date) ?? 9999
    const db = daysUntil(b.date) ?? 9999
    if (da !== db) return da - db
    return rank[effectivePriority(a.date, a.priority)] - rank[effectivePriority(b.date, b.priority)]
  })
}
