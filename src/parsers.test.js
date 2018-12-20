import { eventsParser } from './parsers'

describe('Testing the utils functions', () => {
  it('it adapts the kambi offering api data without liveData', () => {
    const event = eventsParser([], {})
    expect(event).toMatchSnapshot()
    expect(event).toHaveProperty('betOffers')
    expect(event).not.toHaveProperty('liveData')
  })

  it('it adapts the kambi offering api data with liveData', () => {
    const event = eventsParser([], {}, {})
    expect(event).toMatchSnapshot()
    expect(event).toHaveProperty('betOffers')
    expect(event).toHaveProperty('liveData')
  })

  it('it fails to adapt to the kambi offering api data as betOffers and event are undefined', () => {
    expect(eventsParser).toThrowErrorMatchingSnapshot()
  })
})
