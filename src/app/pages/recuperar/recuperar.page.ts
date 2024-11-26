import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  emailOrUsername: string = "";
  mensaje: string = "";

  constructor(private router: Router) {}

  enviarRecuperacion() {
    // Aquí se implementará  la lógica de envío de email o un código de verificación.
    if (this.emailOrUsername) {
      this.mensaje = `Se ha enviado un enlace de recuperación.`;
      // Lógica adicional como resetear campos o redireccionar
    } else {
      this.mensaje = "Se ha enviado un enlace de recuperación. // PLACEHOLDER";
    }
  }
}
