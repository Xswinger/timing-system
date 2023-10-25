import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  currentLane!: number;

  constructor() { }

  ngOnInit(): void {
  }

  onPause() {

  }

  onReset() {

  }

}
