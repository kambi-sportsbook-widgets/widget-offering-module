// @flow
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'
import type { Event } from '../types'
import { getLiveEvent } from '../getLiveEvent'

/**
 * getEvents
 *
 * @export
 * @param {Array} eventIds
 * @returns {Promise<Array<Event>>}
 */
export function getEvents(
  eventIds: Array<string | number>,
  liveData: boolean = true
): Promise<Array<Event>> {
  if (eventIds === 'undefined' || eventIds.length === 0) {
    throw new Error(
      'An event ID is required to return event information from Kambi Offering API'
    )
  }

  // generate correct url for request
  const url = urlParser(`/betoffer/event/${eventIds.join()}`)

  return getData(url).then(data => {
    // Filter BetOffers to Events
    const events = data.events.map(ev => {
      if (ev.state.toLowerCase() === 'started' && liveData) {
        return getLiveEvent(ev.id).then(liveEventData => {
          return adaptKambiOfferingApiData(
            data.betOffers.filter(bet => {
              return bet.eventId === ev.id
            }),
            ev,
            liveEventData
          )
        })
      }
      return adaptKambiOfferingApiData(
        data.betOffers.filter(bet => {
          return bet.eventId === ev.id
        }),
        ev
      )
    })

    return events
  })
}
