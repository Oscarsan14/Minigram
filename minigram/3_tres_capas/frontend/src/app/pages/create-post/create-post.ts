import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-create-post',
  styleUrl: './create-post.css',
  templateUrl: './create-post.html',
})
export class CreatePost {
  private readonly api: RestApiService = inject(RestApiService);
  private router: Router = inject(Router);

  protected caption = signal('');
  protected file = signal<File | null>(null);

  updateCaption(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.caption.set(inputElement.value);
  }

  updateFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.file.set(inputElement.files?.[0] ?? null);
  }

  async onSubmit(): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.api.createPost(this.caption(), this.file()!)
      );
      console.log('Post creado:', result);
      this.router.navigate(['/']);
    } catch (error) {
      console.log('Error al crear post:', error);
    }
  }
}