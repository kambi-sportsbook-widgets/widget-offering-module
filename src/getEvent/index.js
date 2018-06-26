// @flow
import type { Event } from '../types'
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'
import { getLiveEvent } from '../getLiveEvent'
/**
 * getEvent
 *
 * @export
 * @param {number|string} eventId
 * @param {boolean} liveData - determines whether the function should fetch the live event data if the match state === 'STARTED'
 * @returns {Promise<Event>}
 */
export function getEvent(
  eventId: number | string,
  liveData: boolean = true
): Promise<Event> {
  if (eventId == null) {
    throw new Error(
      'An event ID is required to return event information from Kambi Offering API'
    )
  }

  // check if type is number and parse as string
  if (typeof eventId === 'number') {
    eventId = eventId.toString()
  }

  // generate correct url for request
  const url = urlParser(`/betoffer/event/${eventId}.json`)

  return getData(url).then(data => {
    if (data.events[0].state.toLowerCase() === 'started' && liveData) {
      return getLiveEvent(eventId).then(liveEventData => {
        return adaptKambiOfferingApiData(
          data.betOffers,
          data.events[0],
          liveEventData
        )
      })
    }

    return adaptKambiOfferingApiData(data.betOffers, data.events[0])
  })
}
