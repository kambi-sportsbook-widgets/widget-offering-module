// @flow
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'

/**
 * getEvents
 *
 * @export
 * @param {Array} eventIds
 * @returns {Promise<Event>}
 */
export function getEvents(eventIds: Array): Promise<any> {
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
      return adaptKambiOfferingApiData(
        data.betOffers.filter(bet => {
          return bet.eventId === ev.id
        }),
        ev
      )
    })
    // TODO: Check if we should return Betoffers and Events or only Events
    data.events = events
    return data
  })
}
