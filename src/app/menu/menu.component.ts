import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {HeatResultComponent} from '../content/heat-result/heat-result.component'
import {MatListModule} from '@angular/material/list'
import {RouterLinkWithHref, RouterOutlet} from '@angular/router'
import {MenuRoutes} from './routes'
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, HeatResultComponent, MatListModule, RouterOutlet, RouterLinkWithHref, BrowserModule]
})
export class MenuComponent implements OnInit {
  @Input() menuControl: any;

  constructor() { }

  ngOnInit(): void {
  }

  menuItems: MenuRoutes[] = [{
      name: 'Настройки',
      route: 'settings',
      icon: 'settings'
    }, {
      name: 'Табло',
      route: 'scoreboard',
      icon: 'format_list_numbered'
    }, {
      name: 'Выйти',
      route: '../auth',
      icon: 'exit_to_app'
  }
  ]
}
