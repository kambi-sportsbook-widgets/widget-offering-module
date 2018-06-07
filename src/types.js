// @flow

/**
 * Sport Type
 * These are the current supported sports in the Kambi Offering API
 */
export type Sport =
  | 'AMERICAN_FOOTBALL'
  | 'ARCHERY'
  | 'ATHLETICS'
  | 'AUSTRALIAN_RULES'
  | 'BADMINTON'
  | 'BANDY'
  | 'BASEBALL'
  | 'BASKETBALL'
  | 'BEACH_SOCCER'
  | 'BEACH_VOLLEYBALL'
  | 'BIATHLON'
  | 'BOBSLEIGH'
  | 'BOWLS'
  | 'BOXING'
  | 'BRANNBOLL'
  | 'BRIDGE'
  | 'CANOE_KAYAK_FLATWATER'
  | 'CANOE_KAYAK_SLALOM'
  | 'CART'
  | 'CHESS'
  | 'CRICKET'
  | 'CROSS_COUNTRY_SKIING'
  | 'CURLING'
  | 'CYCLING'
  | 'CYCLO_CROSS'
  | 'DARTS'
  | 'DISC_GOLF'
  | 'DIVING'

/**
 * BetOffer Type
 */
export type BetOffer = {|
  id: number,
  suspended: boolean,
  closed: string,
  criterion: Object,
  extra: string,
  betOfferType: Object,
  placeLimit: number,
  eventId: number,
  outcomes: Array<any>,
  place: boolean,
  eachWay: Object,
  scorerType: Object,
  combinableOutcomes: Object,
  tags: string,
  oddsStats: Object,
  sortOrder: number,
  cashOutStatus: string,
  from: Array<any>,
  to: Array<any>,
  description: string,
|}

export type Event = {|
  id: number,
  name: string,
  englishName: string,
  homeName: string,
  awayName: string,
  start: Date,
  originalStartTime: string,
  group: string,
  groupId: number,
  path: Array<any>,
  nonLiveBoCount: number,
  liveBoCount: number,
  sport: Sport,
  tags: string,
  state: 'NOT_STARTED' | 'STARTED' | 'FINISHED',
  distance: string,
  eventNumber: number,
  nameDetails: string,
  editorial: string,
  raceClass: string,
  raceType: string,
  trackType: string,
  going: string,
  timeform: {
    analystVerdict: string,
    drawComment: string,
  },
  participants: Array<any>,
  rank: number,
  groupSortOrder: number,
  teamColors: {},
  sortOrder: number,
  prematchEnd: Date,
  meetingId: string,
|}

export type GlomoEvent = {|
  betOffers: Array<BetOffer>,
  event: Event,
|}
