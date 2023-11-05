export interface Heat {
  lane: number,
  time: string,
  event_id: number
}

export interface Event {
  id: number,
  name: string,
  description: string,
  is_finished: false
}
