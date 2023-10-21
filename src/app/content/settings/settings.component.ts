import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: []
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
