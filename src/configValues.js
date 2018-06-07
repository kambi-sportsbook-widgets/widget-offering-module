let configValues = {}

// TESTING
if (process.env.NODE_ENV === 'test') {
  configValues = {
    market: 'kambi',
    locale: 'en_GB',
    currency: 'EUR',
    channelId: 1,
    streamingAllowedForPlayer: true,
    oddsFormat: 'decimal',
    apiBaseUrl: 'https://e1-api.aws.kambicdn.com/offering/{apiVersion}/',
    apiStatisticsBaseUrl: 'https://e1-api.kambi.com/statistics/api/',
    device: 'desktop',
    auth: false,
    routeRoot: '',
    offering: 'kambi',
    customer: 'kambi',
  }
}

export default configValues
