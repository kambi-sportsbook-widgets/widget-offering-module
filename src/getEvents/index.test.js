import fs from 'fs'
import path from 'path'
import { getEvents } from './index'
import {
  getMultiEventIdFromKambi,
  expectedEventProps,
  expectedBetOfferProps,
  expectedLiveEventProps,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvents([eventIds], liveData) offering module function', () => {
  let response = null
  let eventIds = null

  beforeAll(() => {
    response = getMultiEventIdFromKambi
  })

  it(`it gets events with livedata from kambi offering API`, () => {
    return response().then(ids => {
      eventIds = ids
      let count = 0
      return getEvents(eventIds).then(data => {
        expect(data).toBeDefined()
        data.map(ev => {
          expectedEventProps.forEach(prop => expect(ev).toHaveProperty(prop))
          if (ev.liveData !== null) {
            expectedLiveEventProps.forEach(prop =>
              expect(ev.liveData).toHaveProperty(prop)
            )
          }
          ev.betOffers.forEach(bo => {
            expect(bo.eventId).toEqual(ev.id)
            expectedBetOfferProps.forEach(prop =>
              expect(bo).toHaveProperty(prop)
            )
          })
        })
      })
    })
  })

  it(`it gets events without livedata from kambi offering API`, () => {
    return response().then(ids => {
      eventIds = ids

      return getEvents(eventIds, false).then(data => {
        expect(data).toBeDefined()
        data.map(ev => {
          expectedEventProps.forEach(prop => expect(ev).toHaveProperty(prop))
          expect(ev.liveData).toBeNull()
          ev.betOffers.forEach(bo => {
            expect(bo.eventId).toEqual(ev.id)
            expectedBetOfferProps.forEach(prop =>
              expect(bo).toHaveProperty(prop)
            )
          })
        })
      })
    })
  })

  it('it tries to get an event with an invalid event ID', () => {
    return getEvents(['123123', 'test']).catch(err => {
      expect(err).toMatchSnapshot()
    })
  })

  it('it tries to get an event without passing an event id', () => {
    expect(() => getEvents()).toThrowErrorMatchingSnapshot()
  })
})
