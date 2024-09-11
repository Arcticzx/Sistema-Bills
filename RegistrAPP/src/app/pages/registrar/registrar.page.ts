import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  RegistrarUsuario: string = "";
  RegistrarContrasena: string = "";
  RegistrarRun: number = 0
  RegistrarEstudios: string = "";
  animation!: Animation;
  nombreUsuario: string = "";
  apellidosUsuario: string = "";
  usuario: string = "";
  matriculaUsuario: string = "";
  cursoSeccion: string = "";
  correoUsuario: string = "";
  contrasenaUsuario: string = "";
  

  constructor(private activeRoute: ActivatedRoute, private animationController: AnimationController, private router: Router) { 

    
    this.activeRoute.queryParams.subscribe(params => {
      if (params['usuario']){
        this.RegistrarUsuario = params['usuario'];
        this.RegistrarContrasena = params['contrasena'];
      }
    })
  }

  ngOnInit() {
    this.animacionTexto();
  }
  animacionTexto(){
    const texto = document.getElementById('tPrincipal');

    if (texto) {
      this.animation = this.animationController.create()
      .addElement(texto)
      .duration(5000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(200px)')

      this.animation.play();
      
    }
  }
  guardarDatosUsuario() {
    // Aquí puedes implementar la lógica para guardar o actualizar los datos
    console.log('Nombre:', this.RegistrarUsuario);
    console.log('Apellidos:', this.apellidosUsuario);
    console.log('Matrícula:', this.matriculaUsuario);
    console.log('Curso o Sección:', this.cursoSeccion);
    console.log('Correo electrónico:', this.correoUsuario);
    
    // Si tienes un servicio para enviar estos datos a un backend, lo puedes usar aquí
  }
  validarCredenciales(){
    let navigationExtras: NavigationExtras = {
      queryParams : {
        usuario: this.RegistrarUsuario,
        contrasena: this.RegistrarContrasena
      }
    }

    this.router.navigate(['/inicio'], navigationExtras);
  }

  validarDatos(){
    if (this.RegistrarRun && this.RegistrarEstudios){
      console.log("Datos completos")
    } else {
      console.log("Datos incompletos")
    }
  }

  validarRun(){
    if (this.RegistrarRun){
      console.log("Run válido")
    } else {
      console.log("Run inválido")
    }
  }

  validarEstudios(){
    if (this.RegistrarEstudios){
      console.log("Estudios válidos")
    } else {
      console.log("Estudios inválidos")
    }
  }

  actualizarPerfil(){
    this.validarDatos();
    this.validarRun();
    this.validarEstudios();
  }
  
}