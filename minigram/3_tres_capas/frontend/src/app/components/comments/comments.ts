
import { Component, inject, input, signal } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [AsyncPipe, MatIcon],
  selector: 'app-comments',
  styleUrl: './comments.css',
  templateUrl: './comments.html',

})
export class Comments {
  postId = input<string>();
  protected Newcomment = signal('');


  readonly restApiService = inject(RestApiService);

  comments = new BehaviorSubject<any[]>([]);

ngOnInit() {
    this.restApiService.listComments(this.postId() || '').subscribe(data => {
        console.log('Comentarios recibidos:', data);
        this.comments.next(data);
    });
}



  deleteComment(commentId: number) {
    this.restApiService.deleteComment(commentId).subscribe(() => {
      this.comments.next(
        this.comments.value.filter(comment => comment.id !== commentId)
      );
    });
  }



  updateComment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.Newcomment.set(inputElement.value)
  }

  onCreateComment() {
    const texto = this.Newcomment().trim();

    if (!texto) return;

    this.restApiService.createComment(
      this.postId() || '',
      texto
    ).subscribe(() => {

      this.restApiService.listComments(this.postId() || '').subscribe(data => {
        this.comments.next([...data]);
        console.log('Comentarios actualizados:', data);
      });

      this.Newcomment.set('');
    });
  }
}
