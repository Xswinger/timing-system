import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiContentService {

  constructor(private http: HttpClient) {}

  baseUrl = 'https://swimming.admin47.ru';

  createHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': `Basic ${window.btoa(localStorage.getItem('access')!)}`
      })
    };
  }

  createUser(UserData: any) {
    const url = `${this.baseUrl}/create_user/`;
    return this.http.post(url, UserData, this.createHeader());
  }

  authorization(UserData: any) {
    const url = `${this.baseUrl}/login/`;
    return this.http.post(url, UserData, this.createHeader());
  }

  postTime(HeatDate: any) {
    const url = `${this.baseUrl}/post_time/`;
    return this.http.post(url, HeatDate, this.createHeader());
  }

  getScoreboard(EventId: number) {
    const url = `${this.baseUrl}/scoreboard/${EventId}`;
    return this.http.get(url, this.createHeader());
  }

  getEvents() {
    const url = `${this.baseUrl}/get_events/`;
    return this.http.get(url, this.createHeader());
  }

  addEvent(EventData: any) {
    const url = `${this.baseUrl}/add_event/`;
    return this.http.post(url, EventData, this.createHeader());
  }

  finishEvent(EventId: number) {
    const url = `${this.baseUrl}/finish_event/${EventId}`;
    return this.http.post(url, {}, this.createHeader());
  }


}
