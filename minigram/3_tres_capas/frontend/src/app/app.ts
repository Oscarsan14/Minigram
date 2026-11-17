import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { RestApiService } from './services/rest-api.service';

@Component({
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, RouterLinkWithHref],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('frontend');
  private restApiService = inject(RestApiService);

  private api = inject(RestApiService);

  onLogout() {
    this.api.logout();
  }
}
