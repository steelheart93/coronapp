import { Component, OnInit } from '@angular/core';
import { Chart } from '../../models/Chart';

import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  pieChart_1: Chart;
  barChart_1: Chart;

  constructor() { }

  ngOnInit(): void {
    this.pieChart_1 = {
      title: 'Pie Chart',
      type: ChartType.PieChart,
      columnNames: ['Task', 'Hours per Day'],
      data: [
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Ver TV', 2],
        ['Dormir', 7]
      ],
      options: {
        is3D: true
      }
    };

    this.barChart_1 = {
      title: 'Bar Chart',
      type: ChartType.BarChart,
      columnNames: ['Task', 'Hours per Day'],
      data: [
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Ver TV', 2],
        ['Dormir', 7]
      ]
    };
  }

}
