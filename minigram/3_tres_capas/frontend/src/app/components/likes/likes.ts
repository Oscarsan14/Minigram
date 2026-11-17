
import { Component, inject, input, signal } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon],
  selector: 'app-likes',
  styleUrl: './likes.css',
  templateUrl: './likes.html',
})
export class Likes {

  postId = input('');

  readonly restApiService = inject(RestApiService);

  likes = signal(0);
  meGusta = signal(false);

  ngOnInit() {
    this.actualizarLikes();

    this.restApiService.checkLike(Number(this.postId())).subscribe(data => {
      this.meGusta.set(data);
    });
  }

  actualizarLikes() {
    this.restApiService.countLikes(Number(this.postId())).subscribe(data => {
      console.log('Contador recibido:', data.count);
      this.likes.set(Number(data.count));
    });
  }

  darLike() {
    this.restApiService.switchLike(Number(this.postId())).subscribe(data => {
      console.log('Respuesta del like:', data);

      this.meGusta.set(!this.meGusta());
      this.actualizarLikes();
    });
  }
}
