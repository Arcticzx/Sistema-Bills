import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApijsonService {

  //Variable URL Base:
  urlApi = 'https://jsonplaceholder.typicode.com/'
  recursoApi = 'users';
  token = '';

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    return this.http.get(this.urlApi+this.recursoApi+'/').pipe();
  }

  crearDatos() {
    console.log('NADA POR EL MOMENTO')
  }

  modificarDatos() {
    console.log('NADA POR EL MOMENTO')
  }

  eliminarDatos() {
    console.log('NADA POR EL MOMENTO')
  }
}
