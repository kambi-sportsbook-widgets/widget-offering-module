//@flow
import type { Score } from './score'
import type { Ticker } from './ticker'

export type LiveFeedUpdate = $ReadOnly<{|
  ticker?: Ticker,
  score?: Score,
  type?: string,
|}>
