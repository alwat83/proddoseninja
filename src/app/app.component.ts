import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule],
  standalone: true,
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
  title = 'doseninja';
}
