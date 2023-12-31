export interface HeatResult {
  id: number,
  event_id: number,
  time: string,
  lane: number
}

export interface Event {
  id: number,
  name: string,
  description: string,
  is_finished: false
}
