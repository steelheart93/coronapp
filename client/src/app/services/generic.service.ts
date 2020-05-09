import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  API_URI = "https://www.datos.gov.co/resource/gt2j-8ykr.json";

  constructor(private http: HttpClient) { }

  /**
   * @returns Esta función esta condicionada a retornar un arreglo de objetos JSON.
   */
  getRoot(): Observable<any[]> {
    return this.http.get<{}[]>(this.API_URI + "?$limit=50");
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