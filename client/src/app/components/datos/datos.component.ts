import { Component, OnInit } from '@angular/core';

import { Chart } from '../../models/Chart';
import { Drop } from '../../models/Drop';
import { Filter } from '../../models/Filter';

import { ChartType } from 'angular-google-charts';
import { GenericService } from '../../services/generic.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  drops: Drop[] = [];
  filters: Filter[] = [];
  tableChart: Chart;

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {

    this.llenarDrops();
    this.llenarTable();
  }

  llenarDrops() {
    this.drops.push({
      title: "Fecha",
      group: "fecha_de_notificaci_n"
    });
    this.drops.push({
      title: "Ciudad",
      group: "ciudad_de_ubicaci_n"
    });
    this.drops.push({
      title: "Departamento",
      group: "departamento"
    });
    this.drops.push({
      title: "Atención",
      group: "atenci_n"
    });
    this.drops.push({
      title: "Sexo",
      group: "sexo"
    });
    this.drops.push({
      title: "Procedencia",
      group: "pa_s_de_procedencia"
    });

    this.drops.forEach((drop) => {
      console.log(drop);
      this.genericService.getGroup(drop.group).subscribe(
        res => {
          console.log(res);
          drop.items = res.map((json) => {
            for (const key in json) {
              if (key === drop.group) {
                return json[key];
              }
            }
          });
        },
        error => console.log(error)
      );
    });
  }

  llenarTable() {
    this.genericService.getFilters(this.filters).subscribe(
      res => {
        if (res.length === 0) {
          alert("No se encontraron datos.");
        } else {
          this.tableChart = {
            type: ChartType.Table,
            columnNames: Object.keys(res[0]),
            data: res.map((row) => {
              let array = [];

              if (Object.keys(row).length < Object.keys(res[0]).length) {
                let str = "Incompleto,".repeat(Object.keys(res[0]).length - 1) + "Incompleto";
                array = str.split(',');
              } else {
                for (let key in row) {
                  array.push(row[key].substr(0, 10));
                }
              }

              return array;
            }),
            options: {
              "cssClassNames": {
                'headerRow': 'bg-dark'
              },
              "pageSize": 25,
              "showRowNumber": true
            }
          };
        }
      },
      error => console.log(error)
    );
  }

  /**
   * Callback del evento "change" de los drops.
   * @param valor, valor entregado por el evento.
   * valor = "filter_category,filter_value"; 
   */
  filtrar(valor: String) {
    console.log(valor);

    let filter = valor.split(",");

    for (let i = 0; i < this.filters.length; i++) {
      const json = this.filters[i];

      if (json.category === filter[0]) {
        this.filters.splice(i, 1);
      }
    }

    if (filter[1] !== 'undefined') {
      this.filters.push({
        category: filter[0],
        value: filter[1]
      });
    }

    this.llenarTable();
  }

}

