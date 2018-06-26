// @flow
export type MatchClock = $ReadOnly<{|
  minute?: number,
  second?: number,
  period?: string,
  running?: boolean,
  disabled?: boolean,
|}>
