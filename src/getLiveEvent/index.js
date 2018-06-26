// @flow
import { urlParser, getData } from '../utils'
import type { LiveData } from '../types'

export function getLiveEvent(eventId: number | string): Promise<LiveData> {
  if (eventId == null) {
    throw new Error(
      'An event ID is required to return event information from Kambi Offering API'
    )
  }

  // check if type is number and parse as string
  if (typeof eventId === 'number') {
    eventId = eventId.toString()
  }

  const url = urlParser(`/event/${eventId}/livedata`)

  return getData(url).then(data => {
    return data.liveData
  })
}
