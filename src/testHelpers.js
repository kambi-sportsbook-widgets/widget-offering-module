//@flow
import { XMLHttpRequestNetworkProvider, checkStatus, jsonParser } from './utils'

const URL =
  'https://e1-api.aws.kambicdn.com/offering/v2018/kambi/betoffer/landing?lang=en_GB&market=UK'

export function getEventIdFromKambi() {
  return XMLHttpRequestNetworkProvider(URL)
    .then(checkStatus)
    .then(jsonParser)
    .then(data => {
      const popular = data.result.filter(res => res.name === 'popular')
      if (popular.length > 0) {
        if (popular[0].events.length > 0) {
          return popular[0].events[0].event.id
        }
      }
    })
}
