import fs from 'fs'
import path from 'path'
import { getEvents } from './index'
import {
  getMultiEventIdFromKambi,
  expectedEventProps,
  expectedBetOfferProps,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvent(eventId) offering module function', () => {
  let response = null
  let eventIds = null

  beforeAll(() => {
    response = getMultiEventIdFromKambi
  })

  it(`it gets event ${eventIds} from kambi offering API`, () => {
    return response().then(ids => {
      eventIds = ids

      return getEvents(eventIds).then(data => {
        expect(data).toBeDefined()
        data.map(ev => {
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
    return getEvents(['123123', 'test']).catch(err => {
      expect(err).toMatchSnapshot()
    })
  })

  it('it tries to get an event without passing an event id', () => {
    expect(() => getEvents()).toThrowErrorMatchingSnapshot()
  })
})
