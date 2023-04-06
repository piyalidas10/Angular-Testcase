import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { AppRoutingModule } from './routing.module';
import { LoaderService } from './services/loader/loader.service';
import { ErrorShowService } from './services/error-show/error-show.service';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler/http-error-handler.interceptor';
import { UsersComponent } from './components/core/users/users.component';
import { LoaderComponent } from './components/features/loader/loader/loader.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { LoginComponent } from './components/core/login/login.component';
import { FakeUsersComponent } from './components/core/fake-users/fake-users.component';
import { FakeusersApiService } from './services/fakeusers/fakeusers-api.service';
import { MaskDataPipe } from './shared/pipes/mask-data/mask-data.pipe';
import { DirectivesModule } from './shared/directives/directives.module';
import { PipesModule } from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    FakeUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DirectivesModule,
    PipesModule
  ],
  providers: [
    MaskDataPipe,
    ApiService,
    LoaderService,
    ErrorShowService,
    FakeusersApiService,
    // { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
