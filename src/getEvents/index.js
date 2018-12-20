// @flow
import { eventsParser } from '../parsers'
import { getData, urlParser } from '../utils'

/**
 * getEvents
 *
 * @export
 * @param {[(number | string)]} eventIds
 * @returns {Promise<any>}
 */
export function getEvents(eventIds: Array<number | string>): Promise<any> {
  if (eventIds == null) {
    throw new Error(
      'An event IDs are required to return event information from Kambi Offering API'
    )
  }

  // check if type is number and parse as string
  if (!Array.isArray(eventIds)) {
    throw new Error(
      'Event IDs should be passed as an array of ids as either numbers or strings'
    )
  }

  // generate correct url for request
  const url = urlParser(`/betoffer/event/${eventIds.join(',')}.json`)

  return getData(url).then(data =>
    data.events.map(event =>
      eventsParser(data.betOffers.filter(bo => bo.eventId === event.id), event)
    )
  )
}
