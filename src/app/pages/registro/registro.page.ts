import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbService } from 'src/app/services/db.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: any = {
    correo: "",
    contrasena: ""
  }
  name: string = '';
  email: string = '';
  password: string = '';

  id_usuario: string = "";

  constructor(private router: Router, private toastController: ToastController, private supabaseService: SupabaseService) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario creado de manera correcta',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
  async register() {
    try {
      const response = await this.supabaseService.registerUser(
        this.password,
        this.name
      );
      this.presentToast();
      this.router.navigate(['/login']);
      
      console.log('Usuario registrado:', response);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

}