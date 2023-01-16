export interface EventModel {
  eventId: number,
  dateStart: string,
  dateEnd: string,
  name: string,
  description: string,
  eventTypeId: EventType,
  userId: number,
  recurringTypeId?: ReccuringType
  recurringId?: number
}

export enum EventType {
  Reminder,
  Holiday,
  Birthday,
  Task
}

export enum ReccuringType {
  daily,
  weekly,
  monthly,
  annual
}
