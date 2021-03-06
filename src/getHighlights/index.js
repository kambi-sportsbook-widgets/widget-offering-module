// @flow
import { highlightsParser } from '../parsers'
import { getData, urlParser } from '../utils'

/**
 * getEvent
 *
 * @export
 * @returns {Promise<any>}
 */
export function getHighlights(): Promise<any> {
  // generate correct url for request
  const url = urlParser(`/group/highlight.json`)

  return getData(url).then(data => {
    return highlightsParser(data)
  })
}
