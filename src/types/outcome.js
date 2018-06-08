// @flow
import type { OutcomeCriterion } from './outcomeCriterion'
/**
 * Outcome
 */
export type Outcome = {
  id: number,
  label: string,
  englishLabel: string,
  odds: number,
  line: number,
  distance: string,
  scratched: boolean,
  startNr: number,
  prevOdds: Array<number>,
  criterion: OutcomeCriterion,
  participant: string,
  popular: boolean,
  type: string,
  homeTeamMember: boolean,
  betOfferId: number,
  changedDate: string,
  participantId: number,
  oddsFractional: string,
  oddsAmerican: string,
  status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'SETTLED',
  cashOutStatus: 'ENABLED' | 'DISABLED' | 'SUSPENDED',
  homeScore: string,
  awayScore: string,
}
