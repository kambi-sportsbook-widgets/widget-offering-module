// @flow
import { getEvent } from './getEvent'
import { getEventsByFilter } from './getEventsByFilter'

// requires
let networkProvider = require('./networkProvider')
let configValues = require('./configValues')

class setupOfferingModule {
  static setNetworkProvider(provider: Function) {
    networkProvider = provider
  }

  static getNetworkProvider() {
    return networkProvider.default
  }

  static setConfigValues(values: Object) {
    configValues = Object.assign({}, values)
  }

  static getConfigValues() {
    return configValues
  }
}

const setConfigValues = setupOfferingModule.setConfigValues
const getConfigValues = setupOfferingModule.getConfigValues
const getNetworkProvider = setupOfferingModule.getNetworkProvider
const setNetworkProvider = setupOfferingModule.setNetworkProvider

export {
  setConfigValues,
  getConfigValues,
  getNetworkProvider,
  setNetworkProvider,
  getEvent,
  getEventsByFilter,
}
