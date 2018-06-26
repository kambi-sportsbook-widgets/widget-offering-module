//@flow
export type Ticker = $ReadOnly<{|
  eventId?: number,
  type?: string,
  minute?: number,
  message?: string,
  id?: number,
|}>
