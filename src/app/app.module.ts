import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeatResultComponent } from './content/heat-result/heat-result.component';
import {MatTableModule} from '@angular/material/table';
import { MenuComponent } from './menu/menu.component'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {RouterModule, Routes} from '@angular/router';
import { SettingsComponent } from './content/settings/settings.component'
import {MatListModule} from '@angular/material/list';
import { AuthorizationComponent } from './authorization/authorization.component'
import {AuthorizationGuard} from './authorization/authorization.guard';
import { MainSampleComponent } from './content/main-sample/main-sample.component'

const appRoutes: Routes = [
  {path: 'auth', component: AuthorizationComponent},
  {
    path: 'judge',
    component: MainSampleComponent,
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      {path: 'scoreboard', component: HeatResultComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '**', redirectTo: 'settings'}
    ]},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    MainSampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MenuComponent,
    RouterModule.forRoot(appRoutes),
    MatListModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
