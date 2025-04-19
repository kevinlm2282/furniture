import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // importProvidersFrom(FormsModule, ReactiveFormsModule),
    // importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,          // ngModel
      ReactiveFormsModule   // Reactive Forms
    ),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                  cssLayer: {
                      name: 'primeng',
                      order: 'theme, base, primeng'
                  }
              }
            }
        })
  
  ]
};
