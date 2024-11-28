import { Component } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string;
  clave: string;
  passwordVisible: boolean = false; // Inicializa como falso, la contraseña está oculta por defecto

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.user, this.clave).subscribe(data => {
      console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.token);
      this.router.navigate(['/pages/dashboard']);
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
