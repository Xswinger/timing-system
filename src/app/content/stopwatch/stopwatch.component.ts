import { Component, OnInit } from '@angular/core';
import {ApiContentService} from '../../api.content.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Event} from './stopwatch'
import {WebsocketService} from '../websocket.service'

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  waitingStart: boolean = true;
  eventFinishStatus: boolean = false;

  stopwatchTimeout: any;
  stopwatchTime = 0;

  startTime: any;
  currentTime: any;
  offset: number = 0;

  HeatData!: FormGroup;

  events!: Event[];
  curEvent!: Event;

  constructor(private api: ApiContentService, private formBuilder: FormBuilder, private websocket: WebsocketService) {
    this.HeatData = this.formBuilder.group({
      lane: [0, [Validators.required]],
      time: [null, [Validators.required]],
      event_id: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getTimeStringMinutes() {
    let timeString = new Date(this.stopwatchTime);

    let minutesString = timeString.getMinutes().toString();

    if (timeString.getMinutes() < 10) {
      minutesString = "0" + timeString.getMinutes().toString();
    }

    return minutesString;
  }

  getTimeStringSeconds() {
    let timeString = new Date(this.stopwatchTime);

    let minutesString = timeString.getSeconds().toString();

    if (timeString.getSeconds() < 10) {
      minutesString = "0" + timeString.getSeconds().toString();
    }

    return minutesString;
  }

  getTimeStringMilliseconds() {
    let timeString = new Date(this.stopwatchTime);

    let millisecondsConverted = timeString.getMilliseconds() / 10 | 0;
    let millisecondsString = millisecondsConverted.toString()

    if (millisecondsConverted < 10) {
      millisecondsString = "0" + millisecondsConverted.toString();
    }

    return millisecondsString;
  }

  counter() {
    this.currentTime = new Date().getTime();

    this.stopwatchTime = this.currentTime - this.startTime + this.offset
    this.stopwatchTimeout = setTimeout(this.counter.bind(this), 10);
  }

  onStart(timestamp: number) {
    this.waitingStart = false;
    this.startTime = timestamp;
    this.counter();
  }

  onPause() {
    this.offset = this.stopwatchTime;
    clearTimeout(this.stopwatchTimeout);
  }

  onReset() {
    this.HeatData.get('event_id')?.setValue(this.curEvent.id);
    this.HeatData.get('time')?.setValue(String(this.getTimeStringMinutes()) + ":" + String(this.getTimeStringSeconds()) + "." + String(this.getTimeStringMilliseconds()));
    const heat = this.HeatData.value;

    clearTimeout(this.stopwatchTimeout);
    this.stopwatchTime = 0;
    this.offset = 0;

    this.api.postTime(heat).subscribe(
      (data: any) => {
        console.log(data);
        this.waitingStart = true;
      }, error => {
        console.log(error);
      }
    )
  }

  getTimestamp() {
    this.websocket.messageReceived.subscribe((message: string) => {
      this.onStart(Number(message))
    });
  }

  getEvents() {
    this.api.getEvents().subscribe(
      (data: any) => {
        console.log(data);
        this.events = data;
        for (let event of data) {
          if (!event.is_finished) {
            this.curEvent = event;
            break;
          }
        }
        if (this.curEvent === undefined) {
          this.eventFinishStatus = true;
        } else {
          this.HeatData.get('event_id')?.setValue(this.curEvent.id);
          console.log(this.HeatData.value)
          this.websocket.connect(this.curEvent.id);
          this.getTimestamp();
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
