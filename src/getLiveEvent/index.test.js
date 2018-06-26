import { getLiveEvent } from './index'
import { getLiveEventIdFromKambi, expectedLiveEventProps } from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvent(eventId) offering module function', () => {
  let response = null
  let eventId = null

  beforeAll(() => {
    response = getLiveEventIdFromKambi
  })

  it(`it gets live event information for ${eventId}`, () => {
    return response().then(id => {
      eventId = id

      return getLiveEvent(id).then(data => {
        expect(data).toBeDefined()
        expectedLiveEventProps.forEach(prop =>
          expect(data).toHaveProperty(prop)
        )
      })
    })
  })

  it('it tries to get a live event with an invalid event ID', () => {
    return getLiveEvent('123123').catch(err => {
      expect(err).toMatchSnapshot()
    })
  })

  it('it tries to get a live event without passing an event id', () => {
    expect(() => getLiveEvent()).toThrowErrorMatchingSnapshot()
  })
})
