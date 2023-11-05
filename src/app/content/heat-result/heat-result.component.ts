import {Component, HostListener, OnInit} from '@angular/core';
import {HeatResult} from './heat-result'
import {MatTableModule} from '@angular/material/table'
import {MatCardModule} from '@angular/material/card'
import {Event} from './heat-result'
import {ApiContentService} from '../../api.content.service'
import {FormBuilder} from '@angular/forms'
import {WebsocketService} from '../websocket.service'

@Component({
  selector: 'app-heat-result',
  templateUrl: './heat-result.component.html',
  styleUrls: ['./heat-result.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule
  ]
})
export class HeatResultComponent implements OnInit {

  columnsName: string[] = ["lane", "time"];

  results: HeatResult[] = [];

  curEvent: Event = {
    id: 0,
    name: 'Обновляется...',
    description: 'Обновляется...',
    is_finished: false
  };

  constructor(private api: ApiContentService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  // @HostListener('document:keydown.enter')
  // onEnterClick(): void {
  //   this.getCurrentScoreboard();
  // }

  getEvents() {
    this.api.getEvents().subscribe(
      (data: any) => {
        console.log(data);
        for (let event of data) {
          if (!event.is_finished) {
            this.curEvent = event;
            break;
          }
        }
        this.getCurrentScoreboard();
      }, error => {
        console.log(error);
      }
    )
  }

  getCurrentScoreboard() {
    this.api.getScoreboard(this.curEvent.id).subscribe(
      (data: any) => {
        console.log(data);
        let temporary: HeatResult[] = [];
        for (let times of data) {
          temporary.push(times[0]);
        }
        this.results = temporary;
        console.log(this.results)
      }, error => {
        console.log(error);
      }
    )
  }

}
