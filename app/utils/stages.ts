/**
 * ============================================================================
 * THE ONE JOURNEY
 * ============================================================================
 * Every person in GhostForm is on the same path. The nav used to split them
 * across Leads, Homes and a past-client list that only existed in the
 * briefing — same human, three places.
 *
 * Each stage answers "what do I do next?", not "what is this record?". That's
 * the difference between a pipeline a realtor reads and one they ignore.
 * ============================================================================
 */
export interface Stage {
  value: string
  label: string
  /** The next action, in the realtor's words. */
  next: string
  colour: string
  /** Stages that come after this one — for the "move to" control. */
  advance: string[]
}

export const STAGES: Stage[] = [
  {
    value: 'new', label: 'New', next: 'Call them',
    colour: '#B5563A', advance: ['working', 'lost']
  },
  {
    value: 'working', label: 'In touch', next: 'Send the questionnaire',
    colour: '#9A7B2E', advance: ['showing', 'lost']
  },
  {
    value: 'showing', label: 'Looking', next: 'Find them houses',
    colour: '#9A7B2E', advance: ['under_contract', 'lost']
  },
  {
    value: 'under_contract', label: 'Under contract', next: 'Watch the deadlines',
    colour: '#4C5741', advance: ['past_client', 'lost']
  },
  {
    value: 'past_client', label: 'Past client', next: 'Stay in touch',
    colour: '#4C5741', advance: ['working']
  },
  {
    value: 'lost', label: "Didn't happen", next: 'Keep for the sphere',
    colour: '#A9A39A', advance: ['working']
  }
]

export function findStage(v: string): Stage | undefined {
  return STAGES.find((s) => s.value === v)
}

/** Order for a pipeline view — the sequence a person actually travels. */
export const STAGE_ORDER = ['new', 'working', 'showing', 'under_contract', 'past_client', 'lost']

/**
 * Derive a stage from the data we already have, for records created before
 * this field existed. Read-only inference — nothing is written back, so a
 * realtor who has deliberately set a stage never has it overwritten.
 */
export function inferStage(lead: any): string {
  if (lead.stage) return lead.stage
  if (lead.closedAt) return 'past_client'
  if (lead.status === 'contacted') return 'working'
  return 'new'
}
