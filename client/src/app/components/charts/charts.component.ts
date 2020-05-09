import { Component, OnInit } from '@angular/core';

import { Chart } from '../../models/Chart';
import { ChartType } from 'angular-google-charts';

import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  pieChart: Chart;
  columnChart: Chart;

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.getTotalAtenciones().subscribe(
      res => {
        console.log(res);
        this.pieChart = {
          title: 'Pie Chart - Atenciones',
          type: ChartType.PieChart,
          columnNames: ["Atención", "Total"],
          data: res.map((row) => {
            return [row.atencion, row.count * 1];
          }),
          options: {
            is3D: true
          }
        };
      });

    this.genericService.getTotalDepartamentos().subscribe(
      res => {
        console.log(res);
        this.columnChart = {
          title: 'Column Chart - Top 10 Departamentos',
          type: ChartType.ColumnChart,
          columnNames: ["Departamento", "Total", { role: 'annotation' }],
          data: res.map((row) => {
            return [row.departamento, row.count * 1, row.count];
          })
        };
      });
  }

}
