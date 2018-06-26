import { getEventsByFilter } from './index'
import { expectedEventProps, expectedBetOfferProps } from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEventsByFilter(filter) offering module function', () => {
  // current filters for testing
  const filters = ['/football', '/tennis', '/basketball', '/cycling']

  filters.forEach(filter => {
    it(`it gets ${filter.toUpperCase()} events from kambi offering API`, () => {
      return getEventsByFilter(filter).then(data => {
        expect(data).toBeDefined()
        expect(Array.isArray(data.events)).toBe(true)

        data.events.forEach(ev => {
          expectedEventProps.forEach(prop => expect(ev).toHaveProperty(prop))
        })
      })
    })
  })

  const footballFilters = ['/england/all', '/spain/all', '/italy/all']

  footballFilters.forEach(filter => {
    filter = filters[0] + filter
    it(`it gets ${filter} events from kambi offering API`, () => {
      return getEventsByFilter(filter).then(data => {
        expect(data).toBeDefined()
        expect(Array.isArray(data.events)).toBe(true)
      })
    })
  })

  it('it tries to get filters with a number 123', () => {
    expect(() => getEventsByFilter()).toThrowErrorMatchingSnapshot()
  })
})
