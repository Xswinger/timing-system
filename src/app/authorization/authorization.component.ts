import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from './authorization.service'

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(public auth: AuthorizationService) { }

  ngOnInit(): void {
  }

}
