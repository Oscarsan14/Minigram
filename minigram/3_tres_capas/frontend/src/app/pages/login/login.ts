
import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RestApiService } from '../../services/rest-api.service';
import { MatButtonModule  } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormField,
    MatButtonModule
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private readonly api: RestApiService = inject(RestApiService);
  private router = inject(Router);

  protected hice = signal(true);
  protected username = signal('');
  protected password = signal('');

  updateUsername(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.username.set(inputElement.value);
  }

  updatePassword(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password.set(inputElement.value);
  }

  onlogin() {
    this.api.login(this.username(), this.password()).subscribe({
      next: (respuesta) => {
        if (respuesta.token) {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.log('Error en login:', error);
      }
    });
  }

  // Input de email
  protected email = form(signal(''), p => {
    required(p, { message: 'You must enter a value' });
    email(p, { message: 'Not a valid email' });
  });

  /*
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  */
}
