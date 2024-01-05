import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service'
import {ApiContentService} from '../../api.content.service'
import {Event} from '../settings/settings'

@Component({
  selector: 'app-heat-control',
  templateUrl: './heat-control.component.html',
  styleUrls: ['./heat-control.component.css']
})
export class HeatControlComponent implements OnInit {

  eventFinishStatus: boolean = false;

  curEvent!: Event;

  events!: Event[];

  constructor(private api: ApiContentService, private websocket: WebsocketService) { }

  ngOnInit(): void {
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
          this.websocket.connect(this.curEvent.id);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  giveStart() {
    this.websocket.messageReceived.subscribe((message: string) => {
      console.log("custom " + message);
    });
    this.websocket.sendMessage(String(new Date().getTime()));
  }

  finishHeat() {
    this.api.finishEvent(this.curEvent.id).subscribe(
      (data: any) => {
        console.log(data);
        this.getEvents();
      }, error => {
        console.log(error);
      }
    )
  }

}
