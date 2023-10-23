import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-main-sample',
  templateUrl: './main-sample.component.html',
  styleUrls: ['./main-sample.component.css']
})
export class MainSampleComponent implements OnInit {

  titlesMap = [
    {
      title: "Настройки",
      url: '/judge/settings'
    }, {
      title: "Табло",
      url: '/judge/scoreboard'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.titlesMap.forEach(item => {
      if (item.url == this.router.url) {
        this.currentTitle = item.title;
      }
    })
  }

  changeTitle(title: string) {
    this.currentTitle = title;
  }

  currentTitle: string = "";
}
