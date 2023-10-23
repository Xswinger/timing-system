import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() sendTitleName: EventEmitter<any> = new EventEmitter<any>();
  name: string = 'Настройки';

  sendNewTitle() {
    this.sendTitleName.emit({
      title: this.name
    })
  }

}
