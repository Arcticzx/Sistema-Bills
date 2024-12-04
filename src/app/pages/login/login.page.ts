import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation, AlertController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUsuario: string = "";
  loginContrasena: string = "";
  animation!: Animation;
  

  constructor(
    private storage: Storage,    
    private animationController: AnimationController,
    private router: Router,
    private supabaseService: SupabaseService, // Cambiado a SupabaseService
    private alertController: AlertController,
    private UserServiceService: UserServiceService
    
  ) {this.storage.create();}

  ngOnInit() {
    this.storage.create();
    this.animacionTexto();
    
  }

  async validarCredenciales() {
    try {
      // Llama al servicio de Supabase para iniciar sesión
      const { error } = await this.supabaseService.login(this.loginUsuario, this.loginContrasena);

      if (error) {
        throw new Error(error.message);
      }

      // Si el inicio de sesión es exitoso, redirige al usuario
      this.router.navigate(['/oper']);
    } catch (error: any) {
      // Muestra un mensaje de error si las credenciales son incorrectas
      const alert = await this.alertController.create({
        header: 'Error en inicio de sesión',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['Volver']
      });

      await alert.present();
    }
  }

  animacionTexto() {
    const texto = document.getElementById('tPrincipal');

    if (texto) {
      this.animation = this.animationController.create()
        .addElement(texto)
        .duration(5000)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0px)', 'translateX(200px)');

      this.animation.play();
    }
  }
}
