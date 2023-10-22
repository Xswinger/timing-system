import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  isLoggedJudge = true;
  isLoggedTimekeeper = false;

  setLoggedJudge() {
    this.isLoggedJudge = true;
  }

  setLoggedTimekeeper() {
    this.isLoggedTimekeeper = true;
  }

}
