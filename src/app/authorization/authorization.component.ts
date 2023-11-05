import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from './authorization.service'
import {ApiContentService} from '../api.content.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(public authService: AuthorizationService, private formBuilder: FormBuilder, private api: ApiContentService) {
    this.UserData = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      is_admin: false
    });

  }

  ngOnInit(): void {
  }

  UserData!: FormGroup;
  wrongRegData: boolean = false;
  wrongAuthData: boolean = false;

  authorization() {
    this.wrongAuthData = false;
    const userData = this.UserData.value;
    localStorage.setItem("access", `${userData.username}:${userData.password}`);
    this.api.authorization(userData).subscribe(
      (data: any) => {
        console.log(data);
        if (userData.is_admin) {
          this.authService.setLoggedJudge();
          window.location.href = '/judge/settings';
        } else {
          this.authService.setLoggedTimekeeper();
          window.location.href = '/timekeeper';
        }
      }, error => {
        console.log(error);
        this.wrongAuthData = true;
      }
    )
  }

  registration() {
    this.wrongRegData = false;
    const userData = this.UserData.value;
    localStorage.setItem("access", `${userData.username}:${userData.password}`);
    this.api.createUser(userData).subscribe(
      (data: any) => {
        console.log(data);
        if (userData.is_admin) {
          this.authService.setLoggedJudge();
          window.location.href = '/judge/settings';
        } else {
          this.authService.setLoggedTimekeeper();
          window.location.href = '/timekeeper';
        }
      }, error => {
        console.log(error);
        this.wrongRegData = true;
      }
    )
  }

}
