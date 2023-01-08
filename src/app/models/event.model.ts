export interface EventModel {
  eventId: number,
  dateStart: string,
  dateEnd: string,
  name: string,
  description: string,
  eventTypeId: EventType,
  userId: number,
  recurringId: ReccuringType | null
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
