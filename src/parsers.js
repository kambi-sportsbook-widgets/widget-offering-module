// @flow
import type { Event, KambiEvent, BetOffer, LiveData } from './types'

export const eventsParser = (
  betOffers: Array<BetOffer>,
  event: Event,
  liveData: ?LiveData = null
): Event => {
  if (event == null || betOffers == null) {
    throw new Error('betOffers or event is undefined')
  }
  event.betOffers = betOffers
  if (liveData != null) {
    event.liveData = liveData
  }

  return event
}

export const highlightsParser = (data: { groups: Array<{}> }): Array<{}> =>
  data.groups

export const groupsParser = (data: {
  group: { groups: Array<{}> },
}): Array<{}> => data.group.groups
