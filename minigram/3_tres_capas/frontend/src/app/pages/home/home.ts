
import { Component, inject, signal } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { Post } from '../../components/post/post';

@Component({
    imports: [Post],
    selector: 'app-home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home {
    restApiService = inject(RestApiService);
    posts = signal<any[]>([]);

    constructor() {
        this.cargarPosts();
    }

    cargarPosts() {
        this.restApiService.listPost().subscribe({
            next: (posts) => this.posts.set(posts),
            error: (err) => console.error('Error al cargar posts:', err)
        });
    }

    eliminarPost(id: number) {
        this.posts.update(posts => posts.filter(post => Number(post.id) !== id));
    }
}
