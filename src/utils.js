// @flow
import networkProvider from './networkProvider'
import apiVersions from './apiVersions'
import { PLACEHOLDER } from './constants'
import { getConfigValues } from './index'

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

  let { apiBaseUrl } = config
  let apiUrl = apiBaseUrl.replace(PLACEHOLDER, version)

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

  return `${apiUrl}${config.offering}${requestPath}?${requestString}`
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
  return networkProvider(url)
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
