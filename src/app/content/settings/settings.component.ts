import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {Event} from './settings'
import {ApiContentService} from '../../api.content.service'
import {MatButtonModule} from '@angular/material/button'
import {NgForOf, NgIf} from '@angular/common'
import {MatOptionModule} from '@angular/material/core'
import {MatSelectModule} from '@angular/material/select'
import {MatGridListModule} from '@angular/material/grid-list'
import {WebsocketService} from '../websocket.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    MatGridListModule
  ]
})
export class SettingsComponent implements OnInit {

  CreatedEvent!: FormGroup;

  events!: Event[];

  curEvent!: Event;

  eventAddedStatus: boolean = false;
  eventFinishStatus: boolean = false;

  name: string = 'Настройки';

  constructor(private formBuilder: FormBuilder, private api: ApiContentService, private websocket: WebsocketService) {
    this.getEvents();
  }

  ngOnInit(): void {
    this.CreatedEvent = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  addEvent() {
    const eventData = this.CreatedEvent.value;
    this.api.addEvent(eventData).subscribe(
      (data: any) => {
        console.log(data);
        this.eventAddedStatus = true;
        this.eventFinishStatus = false;
        this.getEvents();
      }, error => {
        console.log(error);
      }
    )
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
