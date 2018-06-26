import { getEvent } from './index'
import {
  getEventIdFromKambi,
  getLiveEventIdFromKambi,
  expectedEventProps,
  expectedBetOfferProps,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvent(eventId) offering module function', () => {
  let response = null
  let live = null
  let eventId = null

  beforeAll(() => {
    response = getEventIdFromKambi
    live = getLiveEventIdFromKambi
  })

  it(`it gets event from kambi offering API`, () => {
    return response().then(id => {
      eventId = id

      return getEvent(id).then(data => {
        expect(data).toBeDefined()
        expectedEventProps.forEach(prop => expect(data).toHaveProperty(prop))
        data.betOffers.forEach(bo => {
          expect(bo.eventId).toEqual(data.id)
          expectedBetOfferProps.forEach(prop => expect(bo).toHaveProperty(prop))
        })
      })
    })
  })

  it(`it gets an event that has live data`, () => {
    return live().then(id => {
      return getEvent(id).then(data => {
        expect(data).toBeDefined()
        expectedEventProps.forEach(prop => expect(data).toHaveProperty(prop))
        data.betOffers.forEach(bo => {
          expect(bo.eventId).toEqual(data.id)
          expectedBetOfferProps.forEach(prop => expect(bo).toHaveProperty(prop))
        })
      })
    })
  })

  it(`it gets an event that is live but does not fetch the live data for the event`, () => {
    return live().then(id => {
      return getEvent(id, false).then(data => {
        expect(data).toBeDefined()
        expect(data.liveData).toBe(null)
      })
    })
  })

  it('it tries to get an event with an invalid event ID', () => {
    return getEvent('123123').catch(err => {
      expect(err).toMatchSnapshot()
    })
  })

  it('it tries to get an event without passing an event id', () => {
    expect(() => getEvent()).toThrowErrorMatchingSnapshot()
  })
})
