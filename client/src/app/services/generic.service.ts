import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Filter } from '../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  API_URI = "https://www.datos.gov.co/resource/gt2j-8ykr.json";

  constructor(private http: HttpClient) { }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getFilters(filters: Filter[]): Observable<any[]> {
    let campos = [];
    campos.push("id_de_caso AS ID");
    campos.push("fecha_de_notificaci_n AS Fecha");
    campos.push("ciudad_de_ubicaci_n AS Ciudad");
    campos.push("departamento AS Departamento");
    campos.push("atenci_n AS Atención");
    campos.push("edad AS Edad");
    campos.push("sexo AS Sexo");
    campos.push("pa_s_de_procedencia AS Procedencia");
    campos.push("fecha_de_muerte AS Muerte");
    campos.push("fecha_recuperado AS Recuperado");

    let options = filters.map((filter) => {
      return `${filter.category}='${filter.value}'`;
    }).join("&");

    console.log(`${this.API_URI}?$select=${campos.join(',')}&$limit=100&$offset=0&${options}`);
    return this.http.get<{}[]>(`${this.API_URI}?$select=${campos.join(',')}&$limit=100&$offset=0&${options}`);
  }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getGroup(grupo: String): Observable<any[]> {
    return this.http.get<{}[]>(`${this.API_URI}?$select=${grupo}&$group=${grupo}&$order=${grupo}`);
  }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getTotalConfirmados(): Observable<any[]> {
    return this.http.get<{}[]>(`${this.API_URI}?$select=count(*) AS confirmados`);
  }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getTotalAtenciones(): Observable<any[]> {
    return this.http.get<{}[]>(`${this.API_URI}?$select=atenci_n AS atencion, count(atenci_n) AS count&$group=atenci_n&$having=count > 0`);
  }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getTotalDepartamentos(): Observable<any[]> {
    return this.http.get<{}[]>(`${this.API_URI}?$select=departamento, count(departamento) AS count&$group=departamento&$order=count DESC&$limit=10`);
  }
}