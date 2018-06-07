// @flow
import { getEvent } from './getEvent'
import { getEventsByFilter } from './getEventsByFilter'

// requires
let networkProvider = require('./networkProvider')
let configValues = require('./configValues')

export function setNetworkProvider(provider: Function) {
  networkProvider = provider
}

export function setConfigValues(values: Object) {
  configValues = values
}

export { getEvent, getEventsByFilter }
