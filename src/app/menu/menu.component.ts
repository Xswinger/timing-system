import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {HeatResultComponent} from '../content/heat-result/heat-result.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, HeatResultComponent]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
