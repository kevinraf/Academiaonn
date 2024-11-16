import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ServeErrorsInterceptor} from "./interceptor/server-error.interceptor";
import { environment } from '../environments/environment.development';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8080"], //192.81.211.92
          disallowedRoutes: ["http://localhost:8080/login/forget"],
        },
      })
    ),


    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServeErrorsInterceptor,
      multi: true
    },

  ]

};

