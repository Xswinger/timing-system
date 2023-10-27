import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  currentLane!: number;
  stopwatchStart: boolean = false;
  stopwatchTimeout: any;
  stopwatchTime = 0;

  startTime: any;
  currentTime: any;
  offset: number = 0;

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

  constructor() { }

  ngOnInit(): void {
  }

  counter() {
    this.currentTime = new Date().getTime();

    this.stopwatchTime = this.currentTime - this.startTime + this.offset
    this.stopwatchTimeout = setTimeout(this.counter.bind(this), 10);
  }

  onStart() {
    this.stopwatchStart = true;
    this.startTime = new Date().getTime();
    this.counter();
  }

  onPause() {
    this.stopwatchStart = false;
    this.offset = this.stopwatchTime;
    clearTimeout(this.stopwatchTimeout);
  }

  onReset() {
    clearTimeout(this.stopwatchTimeout);
    this.stopwatchTime = 0;
    this.offset = 0;
    this.stopwatchStart = false;
  }
}
