// @flow
import { groupsParser } from '../parsers'
import { getData, urlParser } from '../utils'

/**
 * getEvent
 *
 * @export
 * @returns {Promise<any>}
 */
export function getGroups(): Promise<any> {
  // generate correct url for request
  const url = urlParser(`/group.json`)

  return getData(url).then(data => {
    return groupsParser(data)
  })
}
