// @flow
import { getEvent } from './getEvent'
import { getEventsByFilter } from './getEventsByFilter'

// requires
import networkProvider from './networkProvider'
let configValues = require('./configValues')

class setupOfferingModule {
  configValues: Object
  networkProvider: Function

  static set networkProvider(provider: Function) {
    this.networkProvider = provider
  }

  static get networkProvider() {
    return this.networkProvider
  }

  static setConfigValues(values: Object) {
    configValues = values
  }

  static getConfigValues() {
    return configValues
  }
}

const setConfigValues = setupOfferingModule.setConfigValues
const getConfigValues = setupOfferingModule.getConfigValues

export { setConfigValues, getConfigValues, getEvent, getEventsByFilter }
