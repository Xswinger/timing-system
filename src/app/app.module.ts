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
import {JudgeAuthorizationGuard} from './authorization/guards/judge-authorization.guard';
import { MainSampleComponent } from './content/main-sample/main-sample.component';
import { StopwatchComponent } from './content/stopwatch/stopwatch.component'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http'
import {ApiContentService} from './api.content.service';
import { HeatControlComponent } from './content/heat-control/heat-control.component';
import { TipsComponent } from './content/tips/tips.component'

const appRoutes: Routes = [
  {path: 'auth', component: AuthorizationComponent},
  {
    path: 'judge',
    component: MainSampleComponent,
    canActivate: [JudgeAuthorizationGuard],
    canActivateChild: [JudgeAuthorizationGuard],
    children: [
      {path: 'scoreboard', component: HeatResultComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'control', component: HeatControlComponent},
      {path: 'tips', component: TipsComponent},
      {path: '**', redirectTo: 'scoreboard'}
    ]},
  {
    path: 'timekeeper',
    component: StopwatchComponent,
    canActivate: [JudgeAuthorizationGuard],
    canActivateChild: [JudgeAuthorizationGuard],
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    MainSampleComponent,
    StopwatchComponent,
    HeatControlComponent,
    TipsComponent
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
    MatListModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, ApiContentService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
