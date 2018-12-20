//@flow
import { XMLHttpRequestNetworkProvider, checkStatus, jsonParser } from './utils'

const URL =
  'https://eu-offering.kambicdn.org/offering/v2018/kambi/betoffer/landing?lang=en_GB&market=UK'

const networking = (url: string = URL) =>
  XMLHttpRequestNetworkProvider(url)
    .then(checkStatus)
    .then(jsonParser)

export function getEventIdFromKambi() {
  return networking().then(data => {
    const popular = data.result.filter(res => res.name === 'popular')
    if (popular.length > 0) {
      if (popular[0].events.length > 0) {
        return popular[0].events[0].event.id
      }
    }
  })
}

export function getEventIdsFromKambi() {
  return networking().then(data => {
    const popular = data.result.filter(res => res.name === 'popular')
    if (popular.length > 0) {
      if (popular[0].events.length > 0) {
        return popular[0].events.map(({ event }) => event.id)
      }
    }
  })
}

export const configValues = {
  market: 'kambi',
  locale: 'en_GB',
  currency: 'EUR',
  channelId: 1,
  streamingAllowedForPlayer: true,
  oddsFormat: 'decimal',
  apiBaseUrl: 'https://e1-api.aws.kambicdn.com/offering/{apiVersion}/',
  apiStatisticsBaseUrl: 'https://e1-api.kambi.com/statistics/api/',
  apiBaseUrls: {
    v2: 'https://e1-api.kambi.com/offering/api/v2/',
    v3: 'https://e1-api.kambi.com/offering/api/v3/',
    v2018: 'https://e1-api.aws.kambicdn.com/offering/v2018/',
  },
  device: 'desktop',
  auth: false,
  routeRoot: '',
  offering: 'kambi',
  customer: 'kambi',
}

// expected property values to be returned from getData as a minimum
// not all properties from our flow types are used but the most vital are asserted below
export const expectedEventProps = [
  'betOffers',
  'tags',
  'id',
  'name',
  'englishName',
  'start',
  'state',
  'sport',
]

export const expectedBetOfferProps = [
  'id',
  'criterion',
  'eventId',
  'tags',
  'outcomes',
]

export const expectedKambiError = {
  body: '{"error":{"message":"No bet offers found","status":404}}',
  status: 404,
  statusText: 'Not Found',
}
