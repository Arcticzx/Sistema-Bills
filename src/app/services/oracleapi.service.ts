import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OracleapiService {

  private rutaDb = 'http://localhost:3000/vehiculo';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.rutaDb);
  }

  insertVehiculo(vehiculo: any) {
    return this.http.post<any>(this.rutaDb, vehiculo)
  }
}
