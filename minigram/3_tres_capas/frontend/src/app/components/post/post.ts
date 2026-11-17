import { Component, input, Input } from '@angular/core';
import { Timestamp } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Comments } from '../comments/comments';
import { Likes } from '../likes/likes';

type DataPost = {
  id: string;
  username: number;
  caption: string;
  image_filename: string;
  created_at: Timestamp<string>;
  avatar_filename: string;
}

@Component({
  imports: [MatIconModule, MatButtonModule, MatCardModule, Comments, Likes],
  selector: 'app-post',
  styleUrl: './post.css',
  templateUrl: './post.html',
})
export class Post {
  post = input<any | undefined>()
publicacion: any;
}
