import { Component, OnInit } from '@angular/core';
import {HeatResult} from './heat-result'
import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-heat-result',
  templateUrl: './heat-result.component.html',
  styleUrls: ['./heat-result.component.css'],
  standalone: true,
  imports: [
    MatTableModule
  ]
})
export class HeatResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnsName: string[] = ["lane", "name", "time", "place", "points"];

  resultsExample: HeatResult[] = [
    {
      name: "Игорь",
      time: "31.05",
      place: 1,
      points: 12
    },
    {
      name: "Елена",
      time: "32.05",
      place: 2,
      points: 12
    },
    {
      name: "Максим",
      time: "33.05",
      place: 3,
      points: 12
    },
    {
      name: "Григорий",
      time: "34.05",
      place: 4,
      points: 12
    },
    {
      name: "Олег",
      time: "35.05",
      place: 5,
      points: 12
    },
  ];

}
