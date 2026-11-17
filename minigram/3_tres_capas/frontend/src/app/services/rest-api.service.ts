
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    private apiURL = 'http://localhost:3000';
    private jwtTokenKey = 'jwtToken';
    private usernameKey = 'usernameKey';

    private router = inject(Router);
    private http = inject(HttpClient);

    isLoggedIn = signal<boolean>(false);

    // Headers con el token actualizado
    private get headers() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(this.jwtTokenKey)}`
            }
        };
    }

    // Login
    login(username: string, password: string): Observable<any> {
        console.log('Attempting login with username: ', username);

        return this.http.post<any>(
            this.apiURL + '/auth/login',
            { username, password }
        ).pipe(
            tap((Response) => {
                if (Response?.token) {
                    localStorage.setItem(this.jwtTokenKey, Response.token);
                    localStorage.setItem(this.usernameKey, username);
                    this.isLoggedIn.set(true);
                }
            })
        );
    }

    // Logout
    logout(): void {
        localStorage.removeItem(this.jwtTokenKey);
        localStorage.removeItem(this.usernameKey);
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    getUsername(): string | null {
        return localStorage.getItem(this.usernameKey);
    }

    // Posts
    listPost(): Observable<any> {
        return this.http.get(
            this.apiURL + '/posts/feed',
            this.headers
        );
    }

    // Comments
    listComments(postId: string): Observable<any> {
        return this.http.get<any>(
            `${this.apiURL}/comments/list/${postId}`,
            this.headers
        );
    }

    deleteComment(commentId: number): Observable<any> {
        return this.http.delete(
            this.apiURL + '/comments/delete/' + commentId,
            {
                ...this.headers,
                responseType: 'text'
            }
        );
    }

    createComment(postId: string, commentText: string): Observable<any> {
        console.log(`Creating comment ${commentText} to post with ID: ${postId}`);

        return this.http.post(
            this.apiURL + `/comments/create/${postId}`,
            {
                post_id: postId,
                comment: commentText
            },
            {
                ...this.headers,
                responseType: 'text'
            }
        );
    }

    // Likes
countLikes(postId: number): Observable<any> {
  return this.http.get(
    this.apiURL + `/likes/count/${postId}`,
    this.headers
  );
}

switchLike(postId: number): Observable<any> {
  return this.http.get(
    this.apiURL + `/likes/switch-like/${postId}`,
    {
      ...this.headers,
      responseType: 'text'
    }
  );
}
checkLike(postId: number): Observable<boolean> {
  return this.http.get<boolean>(
    this.apiURL + `/likes/doILike/${postId}`,
    this.headers
  );
}
}
