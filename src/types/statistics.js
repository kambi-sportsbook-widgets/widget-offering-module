// @flow
export type Team = $ReadOnly<{|
  yellowCards?: number,
  redCards?: number,
  corners?: number,
|}>

export type Statistics = $ReadOnly<{|
  football?: {
    home?: Team,
    away?: Team,
  },
  sets?: {
    home?: Array<number>, // non played sets are -1
    away?: Array<number>, // non played sets are -1
    homeServe?: boolean,
  },
|}>
