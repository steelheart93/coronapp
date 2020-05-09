import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  API_URI = "https://www.datos.gov.co/resource/gt2j-8ykr.json";

  constructor(private http: HttpClient) { }

  getRoot(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URI + "?$limit=50");
  }

  getTotalConfirmados() {
    return this.http.get(`${this.API_URI}?$select=count(*) AS confirmados`);
  }

  getTotalMuertes() {
    return this.http.get(`${this.API_URI}?$select=count(*) AS muertes&$where=(atenci_n='Fallecido')`);
  }

  getTotalRecuperados() {
    return this.http.get(`${this.API_URI}?$select=count(*) AS recuperados&$where=(atenci_n='Recuperado')`);
  }
}
