import { getEvent } from './index'
import { getEventIdFromKambi } from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvent(eventId) offering module function', () => {
  let response = null
  let eventId = null

  beforeAll(() => {
    response = getEventIdFromKambi
  })

  it(`it gets event ${eventId} from kambi offering API`, () => {
    return response().then(id => {
      eventId = id
      return getEvent(id).then(data => {
        return
      })
    })
  })
})
