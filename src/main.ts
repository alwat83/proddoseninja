import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Changed import name here


bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes) // Used the correct name here
    ]
});
