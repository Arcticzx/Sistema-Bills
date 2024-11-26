import { Component, OnInit } from '@angular/core';
import { ApijsonService } from 'src/app/services/apijson.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  listaDatos: any = [];

  constructor(private apiJson: ApijsonService) { }

  ngOnInit() {
  }

  obtenerDatos(){
    this.apiJson.obtenerDatos().subscribe((respuesta) => {
      this.listaDatos = respuesta;
      console.log(this.listaDatos);
    })
  }

  apiTransbank(){
    
  }

}
