// @flow
import { getEvent } from './getEvent'
import { getEvents } from './getEvents'
import { getEventsByFilter } from './getEventsByFilter'
import { XMLHttpRequestNetworkProvider } from './utils'
import defaultConfigValues from './configValues'

let networkProvider = XMLHttpRequestNetworkProvider
let configValues = defaultConfigValues

export const setNetworkProvider = (provider: Function) => {
  networkProvider = provider
}

export const getNetworkProvider = () => {
  return networkProvider
}

export const setConfigValues = (values: Object) => {
  configValues = Object.assign({}, defaultConfigValues, values)
}

export const getConfigValues = () => {
  return configValues
}

export { getEvent, getEvents, getEventsByFilter }
