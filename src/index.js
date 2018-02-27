export default class OfferingModule {
	constructor() {
		console.log('Welcome in offering module')
	}
}

/*
let data = {
	networkProvider: 'networkProvider',
	baseUrl: 'baseUrl',
	version: 'v3',
}

export default class OfferingModule {
  static getGroupEvents(groupId) {
    let requesPath = '/event/group/' + groupId + '.json'
    return OfferingModule.doRequest(requesPath)
  }

  static getGroup(groupId) {
    let requesPath = '/group/' + groupId + '.json'
    return OfferingModule.doRequest(requesPath)
  }

  static getEventsByFilter(filter, params) {
    filter = filter.replace(/^#?\/?/, '') // removes #/ at the start of the string if present
    let requestPath = '/listView/' + filter
    return OfferingModule.doRequest(requestPath, params, 'v3')
  }

  static adaptV2BetOffer(betOffer) {
    if (betOffer.suspended === true) {
      betOffer.open = false
    }
  }

  static adaptV2LiveData(liveData) {
    if (liveData != null && liveData.statistics != null) {
      let statistics = liveData.statistics
      if (statistics.sets != null) {
        statistics.setBasedStats = statistics.sets
        delete statistics.sets
      }

      if (statistics.football != null) {
        statistics.footballStats = statistics.football
        delete statistics.football
      }
    }
  }

  static adaptV2Event(event) {
    // v3 and v2 event objects are almost the same
    // only a few attributes we don't use are different
  }

  static getLiveEventData(eventId) {
    let requestPath = '/event/' + eventId + '/livedata.json'
    return OfferingModule.doRequest(requestPath, null, null, true).then(res => {
      this.adaptV2LiveData(res)
      return res
    })
  }

  static getLiveEvents() {
    let requestPath = '/event/live/open.json'
    return OfferingModule.doRequest(requestPath, null, null, true).then(res => {
      if (res.error != null) {
        return res
      }
      let events = res.liveEvents
      res.events = events
      res.events.forEach(this.adaptV2Event)
      delete res.liveEvents
      delete res.group
      events.forEach(e => {
        e.betOffers = []
        if (e.mainBetOffer != null) {
          this.adaptV2BetOffer(e.mainBetOffer)
          e.betOffers.push(e.mainBetOffer)
          delete e.mainBetOffer
        }
        this.adaptV2LiveData(e.liveData)
      })
      return res
    })
  }

  static getLiveEvent(eventId) {
    let requestPath = '/betoffer/live/event/' + eventId + '.json'
    return OfferingModule.doRequest(requestPath, null, null, true).then(res => {
      res.betOffers = res.betoffers
      delete res.betoffers
      res.betOffers.forEach(this.adaptV2BetOffer)
      res.event = res.events[0]
      this.adaptV2Event(res.event)
      delete res.events
      return res
    })
  }

  static getLiveEventsByFilter(filter) {
    // Todo: implement a filter request when the offering API supports it
    filter = filter.replace(/\/$/, '')

    let filterTerms = filter.split('/')
    filterTerms = filterTerms.slice(0, 3)

    let requestPath = '/listView/all/all/all/all/in-play/'

    return new Promise((resolve, reject) => {
      OfferingModule.doRequest(requestPath, null, 'v3').then(response => {
        let result = {
            events: [],
          },
          i = 0,
          len = response.events.length
        for (; i < len; ++i) {
          let j = 0,
            termLen = response.events[i].event.path.length,
            addEvent = true
          if (termLen > filterTerms.length) {
            termLen = filterTerms.length
          }
          for (; j < termLen; ++j) {
            if (
              filterTerms[j] !== 'all' &&
              response.events[i].event.path[j].termKey !== filterTerms[j]
            ) {
              addEvent = false
            }
          }
          if (addEvent) {
            result.events.push(response.events[i])
          }
        }
        resolve(result)
      })
    })
  }

  static getEvent(eventId) {
    return OfferingModule.doRequest('/betoffer/event/' + eventId + '.json').then(res => {
      res.betOffers = res.betoffers
      delete res.betoffers
      res.betOffers.forEach(this.adaptV2BetOffer)
      res.event = res.events[0]
      this.adaptV2Event(res.event)
      delete res.events
      return res
    })
  }

  static getHighlight() {
    return OfferingModule.doRequest('/group/highlight.json').then(highlights => {
      // sorting based on sortOrder
      if (Array.isArray(highlights.groups)) {
        highlights.groups.sort((a, b) => {
          if (parseInt(a.sortOrder, 10) > parseInt(b.sortOrder, 10)) {
            return 1
          }
          if (parseInt(a.sortOrder, 10) < parseInt(b.sortOrder, 10)) {
            return -1
          }
          return 0
        })
      }
      return highlights
    })
  }

  static doRequest(requestPath, params, version, noCache) {
    let config = coreLibrary.config
    if (config.offering == null) {
      console.warn(
        'The offering has not been set, is the right widget api version loaded?'
      )
    } else {
      let apiUrl = config.apiBaseUrl.replace(
        '{apiVersion}',
        version != null ? version : config.version
      )
      let requestUrl = apiUrl + config.offering + requestPath
      let overrideParams = params || {}
      let requestParams = {
        lang: overrideParams.locale || config.locale,
        market: overrideParams.market || config.market,
        client_id: overrideParams.client_id || config.client_id,
        include: overrideParams.include || '',
        betOffers: overrideParams.betOffers || 'COMBINED',
        categoryGroup: overrideParams.categoryGroup || 'COMBINED',
        displayDefault: overrideParams.displayDefault || true,
      }
      if (noCache === true) {
        requestParams.nocache = Date.now()
      }
      requestUrl +=
        '?' +
        Object.keys(requestParams)
          .map(function(k) {
            return (
              encodeURIComponent(k) + '=' + encodeURIComponent(requestParams[k])
            )
          })
          .join('&')

      return coreLibrary.getData(requestUrl)
    }
  }
}
*/
