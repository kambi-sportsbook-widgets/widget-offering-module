// @flow
import type { Sport } from './sports'
import type { Tags } from './tags'
import type { Outcome } from './outcome'
import type { OutcomeCriterion } from './outcomeCriterion'
import type { GroupPath } from './groupPath'
import type { MatchClock } from './matchClock'
import type { Score } from './score'
import type { Statistics } from './statistics'
import type { VisualizationOccurrence } from './visualizationOccurrence'
import type { MatchOccurrence } from './matchOccurrence'
import type { LiveFeedUpdate } from './liveFeedUpdate'
import type { Ticker } from './ticker'
import type { LiveStatistics } from './liveStatistics'

/**
 * BetOffer Type
 */
export type BetOffer = $ReadOnly<{|
  id?: number,
  suspended?: boolean,
  closed?: string,
  criterion?: Object,
  extra?: string,
  betOfferType?: Object,
  placeLimit?: number,
  eventId?: number,
  outcomes?: Array<Outcome>,
  place?: boolean,
  eachWay?: {
    fractionMilli?: number,
    terms?: string,
    placeLimit?: number,
  },
  scorerType?: OutcomeCriterion,
  combinableOutcomes?: {
    playerOutcomes?: Array<Outcome>,
    resultOutcomes?: Array<Outcome>,
    outcomeCombinations?: {
      odds?: number,
      oddsFractional?: string,
      oddsAmerican?: string,
      playerOutcome?: Outcome,
      resultOutcome?: Outcome,
    },
  },
  tags?: Array<Tags>,
  oddsStats?: {
    unexpectedOddsTrend?: boolean,
    outcomeId?: number,
    startingOdds?: number,
    startingOddsFractional?: string,
    startingOddsAmerican?: string,
  },
  sortOrder?: number,
  cashOutStatus?: 'ENABLED' | 'DISABLED' | 'SUSPENDED',
  from?: number,
  to?: number,
  description?: string,
|}>

export type KambiEvent = $ReadOnly<{|
  id?: number,
  name?: string,
  englishName?: string,
  homeName?: string,
  awayName?: string,
  start?: Date,
  originalStartTime?: string,
  group?: string,
  groupId?: number,
  path?: Array<GroupPath>,
  nonLiveBoCount?: number,
  liveBoCount?: number,
  sport?: Sport,
  tags?: string,
  state: 'NOT_STARTED' | 'STARTED' | 'FINISHED',
  distance?: string,
  eventNumber?: number,
  nameDetails?: string,
  editorial?: string,
  raceClass?: string,
  raceType?: string,
  trackType?: string,
  going?: string,
  timeform?: {
    analystVerdict?: string,
    drawComment?: string,
  },
  participants?: Array<any>,
  rank?: number,
  groupSortOrder?: number,
  teamColors?: {},
  sortOrder?: number,
  prematchEnd?: Date,
  meetingId?: string,
|}>

export type LiveData = $ReadOnly<{|
  eventId?: number,
  matchClock?: MatchClock,
  score?: Score,
  statistics?: Statistics,
  description?: string,
  latestVisualization?: VisualizationOccurrence,
  occurrences?: Array<MatchOccurrence>,
  liveFeedUpdates?: Array<LiveFeedUpdate>,
  tickers?: Array<Ticker>,
  liveStatistics?: Array<LiveStatistics>,
|}>

export type KambiResponseType = $ReadOnly<{|
  betOffers: Array<BetOffer>,
  events: Array<KambiEvent>,
|}>

export type Event = KambiEvent & {|
  betOffers: Array<BetOffer>,
  liveData: LiveData | null,
|}
