import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-oper',
  templateUrl: './oper.page.html',
  styleUrls: ['./oper.page.scss'],
})

export class OperPage implements OnInit {

  inicioUsuario: string = "";
  inicioContrasena: string = "";
  inicioRun: number = 0
  inicioEstudios: string = "";
  animation!: Animation;
  nombreUsuario: string = "";
  apellidosUsuario: string = "";
  matriculaUsuario: string = "";
  cursoSeccion: string = "";
  correoUsuario: string = "";
  

  constructor(private activeRoute: ActivatedRoute, private animationController: AnimationController, private router: Router) { 

    
    this.activeRoute.queryParams.subscribe(params => {
      if (params['usuario']){
        this.inicioUsuario = params['usuario'];
        this.inicioContrasena = params['contrasena'];
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
    console.log('Nombre:', this.inicioUsuario);
    console.log('Apellidos:', this.apellidosUsuario);
    console.log('Matrícula:', this.matriculaUsuario);
    console.log('Curso o Sección:', this.cursoSeccion);
    console.log('Correo electrónico:', this.correoUsuario);
    
    // Si tienes un servicio para enviar estos datos a un backend, lo puedes usar aquí
  }
  validarCredenciales(){
    let navigationExtras: NavigationExtras = {
      queryParams : {
        usuario: this.inicioUsuario,
        contrasena: this.inicioContrasena
      }
    }

    this.router.navigate(['/inicio'], navigationExtras);
  }

  validarDatos(){
    if (this.inicioRun && this.inicioEstudios){
      console.log("Datos completos")
    } else {
      console.log("Datos incompletos")
    }
  }

  validarRun(){
    if (this.inicioRun){
      console.log("Run válido")
    } else {
      console.log("Run inválido")
    }
  }

  validarEstudios(){
    if (this.inicioEstudios){
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

  selectorBanco(){

    this.router.navigate(['/inicio']);
  }
  
}
