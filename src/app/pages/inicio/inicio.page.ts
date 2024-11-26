import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { OracleapiService } from 'src/app/services/oracleapi.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  inicioUsuario: string = "";
  inicioContrasena: string = "";
  inicioPatente: string = "";
  inicioMarca: string = "";
  inicioModelo: string ="";
  inicioTipo : string = "";

  constructor(private dbServices: DbService, 
              private router: Router, 
              private toastController: ToastController,
              private oracleApi: OracleapiService ) { 
  }

  ngOnInit() {
    this.oracleApi.getData();
  }

  almacenarVehiculo(){
    const vehiculo = {
      ppu: this.inicioPatente,
      marca: this.inicioMarca,
      modelo: this.inicioModelo,
      tipo: this.inicioTipo
    }

    //PRUEBA BORRAR DSADASDADSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    this.oracleApi.insertVehiculo(vehiculo).subscribe((response) => {
      console.log('Vehiculo insertado con exito: ', response);
      const vehiculo = {ppu: '', marca: '', modelo: '', tipo: ''}
    }, (error) => {
      console.log('Error al insertar vehiculo: ', error);
    })
  }

  verRegistro() {
    this.router.navigate(['/vehiculo'])
  }

  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true
    })
  }

  async verCoordenadas() {
    const coordenadas = await Geolocation.getCurrentPosition()
    let ubicacionTexto = "Latitud: " + coordenadas.coords.latitude + " longitud: " + coordenadas.coords.longitude
    console.log(ubicacionTexto);
    this.mostrarMensaje(ubicacionTexto)
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 3000,
      position: 'top'
    })

    await toast.present();
  }

  limpiarDatos(){
    this.inicioPatente = "";
    this.inicioMarca = "";
    this.inicioModelo = "";
    this.inicioTipo = "";
  }

}
