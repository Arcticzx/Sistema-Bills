import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { OracleapiService } from 'src/app/services/oracleapi.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Storage } from '@ionic/storage-angular';

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
              private storage: Storage, 
              private router: Router, 
              private supabaseService: SupabaseService,
              private UserServiceService: UserServiceService,
              private toastController: ToastController,
              private oracleApi: OracleapiService ) { 
              
  }

  ngOnInit() {
    this.oracleApi.getData();
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

  async consultarSaldo() {
    const Id = localStorage.getItem('Id');
    console.log('ID recuperado:', Id);
    if (!Id) {
      this.mostrarMensaje('No se encontró al usuario autenticado.');
      return;
    }
  
    try {
      const saldo = await this.supabaseService.getSaldo(Id);
      if (saldo !== null) {
        this.mostrarMensaje(`Tu saldo es: $${saldo}`);
      } else {
        this.mostrarMensaje('No se pudo obtener el saldo.');
      }
    } catch (error) {
      console.error('Error al consultar el saldo:', error);
      this.mostrarMensaje('Ocurrió un error al consultar el saldo.');
    }
  }
}
