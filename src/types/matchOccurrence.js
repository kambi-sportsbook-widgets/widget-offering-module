// @flow
export type Player = $ReadOnly<{|
  id?: number,
  name?: string,
|}>

export type MatchOccurrence = $ReadOnly<{|
  id?: number,
  eventId?: number,
  occurrenceTypeId?: string,
  secondInPeriod?: number,
  secondInMatch?: number,
  secondInPeriodAddedTime?: number,
  periodId?: string,
  player?: Player,
  playerOut?: Player,
  additionalProperties?: Array<string>,
  action?: string,
  index?: number,
  periodIndex?: number,
|}>
