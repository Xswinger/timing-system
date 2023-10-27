import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule, MatIconRegistry} from '@angular/material/icon'
import {HeatResultComponent} from '../content/heat-result/heat-result.component'
import {MatListModule} from '@angular/material/list'
import {RouterLinkWithHref, RouterOutlet} from '@angular/router'
import {MenuRoutes} from './routes'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {NgOptimizedImage} from '@angular/common'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, HeatResultComponent, MatListModule, RouterOutlet, RouterLinkWithHref, BrowserModule, MatCheckboxModule, NgOptimizedImage]
})
export class MenuComponent implements OnInit {
  @Input() menuControl: any;
  @Output() onChangePage = new EventEmitter<any>();
  change(title: string) {
    this.menuControl.toggle();
    this.onChangePage.emit(title);
  }

  logoUrl: string = "./menu-logo.png";

  constructor(private iconRegister: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.iconRegister.addSvgIconLiteral("menu-logo", domSanitizer.bypassSecurityTrustHtml(this.logoUrl));
  }

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
    }
  ]
}
