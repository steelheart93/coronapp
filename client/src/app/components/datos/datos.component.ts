import { Component, OnInit } from '@angular/core';

import { Chart } from '../../models/Chart';
import { ChartType } from 'angular-google-charts';

import { GenericService } from '../../services/generic.service';

class Drop {
  title?: String;
  group?: String;
  items?: any[];
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  drops: Drop[] = [];
  tableChart: Chart;

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {

    this.llenarDrops();

    this.genericService.getRoot().subscribe(
      res => {
        console.log(res);

        this.tableChart = {
          type: ChartType.Table,
          columnNames: Object.keys(res[0]),
          data: res.map((row) => {
            let array = [];

            if (Object.keys(row).length < Object.keys(res[0]).length) {
              array = Object.keys(res[0]);
            } else {
              for (let key in row) {
                array.push(row[key].substr(0, 10));
              }
            }

            return array;
          })
        };
      },
      error => console.log(error)
    );
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
                return json[key].substr(0, 10);
              }
            }
          });
        },
        error => console.log(error)
      );
    });

  }

  /**
   * Callback del evento "change" de los drops.
   * @param valor, valor entregado por el evento. 
   */
  filtrar(valor: String) {
    console.log(valor);
  }

}

