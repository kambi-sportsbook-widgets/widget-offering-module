// @flow
export type ExtendedEventParticipant = $ReadOnly<{|
  startNumber?: number,
  startPosition?: number,
  driverName?: string,
  age?: string,
  weight?: string,
  editorial?: string,
  hasIcon?: boolean,
  trainerName?: string,
  formFigures?: [
    {
      type?: string,
      figures?: string,
    },
  ],
  lastRunDays?: [
    {
      type?: 'Flat' | 'Jump',
      days?: string,
    },
  ],
  raceHistorySet?: [
    {
      type?: 'Course' | 'CourseDistance' | 'Distance' | 'BeatenFavourite',
      stat?: string,
    },
  ],
|}>

export type EventParticipant = $ReadOnly<{|
  participantId?: number,
  name?: string,
  extended?: ExtendedEventParticipant,
  scratched?: boolean,
  nonRunner?: boolean,
  startNumber?: number,
|}>
