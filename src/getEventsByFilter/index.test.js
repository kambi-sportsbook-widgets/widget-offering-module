import { getEventsByFilter } from './index'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEventsByFilter(filter) offering module function', () => {
  it(`it gets FOOTBALL events from kambi offering API`, () => {
    return getEventsByFilter('/football').then(data => {
      // expect(data).toHaveProperty('event')
      console.log(data)
    })
  })
})
