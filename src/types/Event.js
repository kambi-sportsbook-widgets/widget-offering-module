class Event {
  constructor(event) {
    const {
      id,
      name,
      englishName,
      homeName,
      awayName,
      path,
      start,
      type,
      openForLiveBetting,
      sport,
      displayType,
      preMatchEnd,
      liveBetOffers,
    } = event

    return {
      id,
      name,
      englishName,
      homeName,
      awayName,
      path,
      start: new Date(start),
      preMatchEnd: new Date(preMatchEnd),
      openForLiveBetting,
      type,
      sport,
      displayType,
      liveBetOffers,
    }
  }
}
