//@flow
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'

export function getEventsByFilter(filter: string): Promise<any> {
  if (filter == null) {
    throw new Error(
      'A string filter must be defined to query against the Kambi Offering API. E.g. "/football"'
    )
  }

  filter = filter.replace(/^#?\/?/, '') // removes #/ at the start of the string if present

  const url = urlParser(`/listView/${filter}`)

  return getData(url).then(data => {
    const events = data.events.map(ev => {
      return adaptKambiOfferingApiData(
        ev.betOffers,
        ev.event,
        ev.liveData ? ev.liveData : null
      )
    })

    data.events = events
    return data
  })
}
