import { Component, OnInit } from '@angular/core';

import { Chart } from '../../models/Chart';
import { ChartType } from 'angular-google-charts';

import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  tableChart: Chart;

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.getRoot().subscribe(
      res => {
        this.tableChart = {
          type: ChartType.Table,
          columnNames: Object.keys(res[0]),
          data: res.map((row) => {
            let array = [];
            for (let key in row) {
              array.push(row[key]);
            }
            return array;
          })
        };
      });
  }

}

