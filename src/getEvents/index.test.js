import fs from 'fs'
import path from 'path'
import { getEvents } from './index'
import {
  getEventIdsFromKambi,
  expectedEventProps,
  expectedBetOfferProps,
  expectedKambiError,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvents([eventId]) offering module function', () => {
  let response = null
  let eventIds = []

  beforeAll(() => {
    response = getEventIdsFromKambi
  })

  it(`it gets event ${eventIds} from kambi offering API`, () => {
    return response().then(ids => {
      eventIds = ids
      if (eventIds.length > 3) {
        eventIds = eventIds.slice(0, 3)
      }
      return getEvents(ids).then(data => {
        expect(data).toBeDefined()

        data.forEach(ev => {
          expectedEventProps.forEach(prop => expect(ev).toHaveProperty(prop))

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
    return getEvents(['123123']).catch(err => {
      expect(err).toMatchObject(expectedKambiError)
    })
  })

  it('it tries to get an event without passing an event id', () => {
    expect(() => getEvent()).toThrowErrorMatchingSnapshot()
  })
})
