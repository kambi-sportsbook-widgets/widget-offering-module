import fs from 'fs'
import path from 'path'
import { getGroups } from './index'
import {
  expectedEventProps,
  expectedBetOfferProps,
  expectedKambiError,
} from '../testHelpers'

jest.setTimeout(30000) // need to increase default timeout for functions as we're making network requests

describe('Test suite for getGroups offering module function', () => {
  it(`it gets group.json from kambi offering API`, () => {
    return getGroups().then(groups => {
      expect(groups).toBeDefined()
      expect(Array.isArray(groups)).toBe(true)
    })
  })
})
