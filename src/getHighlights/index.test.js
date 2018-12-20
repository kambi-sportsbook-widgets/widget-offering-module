import fs from 'fs'
import path from 'path'
import { getHighlights } from './index'
import {
  expectedEventProps,
  expectedBetOfferProps,
  expectedKambiError,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getEvent(eventId) offering module function', () => {
  it(`it gets highlight.json from kambi offering API`, () => {
    return getHighlights().then(groups => {
      expect(groups).toBeDefined()
      expect(Array.isArray(groups)).toBe(true)
    })
  })
})
