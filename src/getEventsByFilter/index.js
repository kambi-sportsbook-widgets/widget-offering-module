//@flow
import { getData, urlParser, adaptKambiOfferingApiData } from '../utils'

export function getEventsByFilter(filter: string): Promise<any> {
  filter = filter.replace(/^#?\/?/, '') // removes #/ at the start of the string if present

  const url = urlParser(`/listView/${filter}`)

  return getData(url)
}
