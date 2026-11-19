
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Comments } from '../comments/comments';
import { Likes } from '../likes/likes';
import { RestApiService } from '../../services/rest-api.service';

@Component({
    imports: [MatIconModule, MatButtonModule, MatCardModule, Comments, Likes],
    selector: 'app-post',
    styleUrl: './post.css',
    templateUrl: './post.html',
})
export class Post {
    api = inject(RestApiService);
    post = input<any | undefined>();
    postDeleted = output<number>();

    deletePost() {
        const id = this.post()?.id;
        if (!id) return;

        this.api.deletePost(id).subscribe({
            next: () => {
                this.postDeleted.emit(Number(id));
            },
            error: (err) => console.error('Error al eliminar post:', err)
        });
    }
}
