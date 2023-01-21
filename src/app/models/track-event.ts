import { TrackEventValue } from "./track-event-value";

export class TrackEvent {
    clientTye: string;
    url: string;
    customValue?: string;
    key: string;
    value: TrackEventValue;
    created: number;
  }