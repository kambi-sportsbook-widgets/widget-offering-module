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

export const groupsParser = (data: { groups: Array<{}> }): Array<{}> =>
  data.groups
