// @flow
import apiVersions from './apiVersions'
import { getConfigValues, getNetworkProvider } from './index'

// Types
import type { GlomoEvent } from './types'

/**
 * Adapting the kambi api response to be more usable in the widgets
 *
 * @export
 * @param {Object} data
 * @returns {GlomoEvent}
 */
export function adaptKambiOfferingApiData(data: Object): GlomoEvent {
  return {
    event: data.events[0],
    betOffers: data.betOffers,
  }
}

/**
 * errorProvider
 *
 * @export
 * @param {Object} error
 */
export function errorProvider(error: Object) {
  console.debug('Error fetching data')
  console.trace(`${error.status}:: ${error.statusText}`)
  throw error
}

/**
 * jsonParser
 *
 * @export
 * @param {Object} response
 * @returns
 */
export function jsonParser(response: Object) {
  return JSON.parse(response.body)
}

/**
 * urlParser
 *
 * @export
 * @param {string} requestPath
 * @param {Object} [config=configValues]
 * @param {Object} [overrideConfig={}]
 * @param {string} [version=apiVersions.v2018]
 * @returns {string}
 */
export function urlParser(
  requestPath: string,
  config: Object = getConfigValues(),
  overrideConfig: Object = {},
  version: string = apiVersions.v2018
): string {
  if (config.offering == null) {
    console.warn('====================================')
    console.warn('Offering Module')
    console.warn(
      'The offering key for the config has not been set, is the widget loading the correct api version'
    )
    console.warn('====================================')
    return ''
  }

  if (config.apiBaseUrls == null) {
    console.warn('====================================')
    console.warn('Offering Module')
    console.warn(
      'The offering key for the "apiBaseUrls" has not been set. You should set this value to:'
    )
    console.warn('apiBaseUrls: { "v2018": "{url-as-documented-by-kambi}" }')
    console.warn('====================================')
    return ''
  }

  let requestParams = {
    lang: config.locale,
    market: config.market,
    client_id: config.client_id,
    include: '',
    betOffers: 'COMBINED',
    categoryGroup: 'COMBINED',
    displayDefault: true,
  }

  // Merge with override config
  requestParams = Object.assign(requestParams, overrideConfig)

  const requestString = Object.keys(requestParams)
    .map(
      param =>
        `${encodeURIComponent(param)}=${encodeURIComponent(
          requestParams[param]
        )}`
    )
    .join('&')

  return `${config.apiBaseUrls[version]}${
    config.offering
  }${requestPath}?${requestString}`
}

/**
 * checkStatus
 *
 * @export
 * @param {Object} response
 * @returns
 */
export function checkStatus(response: Object) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw response
  }
}

/**
 * getData
 *
 * @export
 * @param {string} url
 * @param {Function} [parser=jsonParser]
 * @returns {Promise<any>}
 */
export function getData(
  url: string,
  parser: Function = jsonParser
): Promise<any> {
  const networker = getNetworkProvider()
  return networker(url)
    .then(checkStatus)
    .then(jsonParser)
    .catch(errorProvider)
}

/**
 * XMLHttpRequestNetworkProvider
 *
 * @export
 * @param {string} url
 * @returns {Promise<any>}
 */
export function XMLHttpRequestNetworkProvider(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // fetch API is not supported in IE11 so we use
    // old-school XMLHttpRequest
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onload = function() {
      const response = {
        status: xhr.status,
        statusText: xhr.statusText,
        body: 'response' in xhr ? xhr.response : xhr.responseText,
      }

      resolve(response)
    }

    xhr.onerror = () => reject(new TypeError('Network request failed'))

    xhr.ontimeout = () => reject(new TypeError('Network request failed'))

    xhr.send()
  })
}
