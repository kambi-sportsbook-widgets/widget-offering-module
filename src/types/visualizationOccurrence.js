// @flow
export type VisualizationOccurrence = $ReadOnly<{|
  id?: number,
  eventId?: number,
  occurrenceTypeId?: number,
  periodId?: number,
  visualization?: {|
    position?: {|
      x?: number, // x position of the field occurrence
      y?: number, // y position of the field occurrence
      zone?: string,
    |},
  |},
|}>
