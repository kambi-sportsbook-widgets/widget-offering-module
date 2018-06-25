// @flow
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'

/**
 * getEvent
 *
 * @export
 * @param {(number | string)} eventId
 * @returns {Promise<any>}
 */
export function getEvent(eventId: number | string): Promise<any> {
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
    return adaptKambiOfferingApiData(data.betOffers, data.events[0])
  })
}
