import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { TrackingDirective } from './directives/tracking/tracking.directive';
import { ClickBgcolorChangeDirective } from './directives/click-bgcolor-change/click-bgcolor-change.directive';
import { MouseBgcolorChangeDirective } from './directives/mouse-bgcolor-change/mouse-bgcolor-change.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TitlePipe } from './pipes/title/title.pipe';
import { DataRangePipe } from './pipes/data-range/data-range.pipe';
import { DateConverterPipe } from './pipes/date-converter/date-converter.pipe';
import { AppRoutingModule } from './routing.module';
import { LoaderService } from './services/loader/loader.service';
import { ErrorShowService } from './services/error-show/error-show.service';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler/http-error-handler.interceptor';
import { AgeRangeFilterPipe } from './pipes/age-range-filter/age-range-filter.pipe';
import { UsersComponent } from './components/core/users/users.component';
import { LoaderComponent } from './components/features/loader/loader/loader.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { LoginComponent } from './components/core/login/login.component';
import { FakeUsersComponent } from './components/core/fake-users/fake-users.component';
import { CharactersOnlyDirective } from './directives/characters-only/characters-only.directive';
import { FakeusersApiService } from './services/fakeusers/fakeusers-api.service';
import { NumbersOnlyDirective } from './directives/numbers-only/numbers-only.directive';
import { AlphanumericOnlyDirective } from './directives/alphanumeric-only/alphanumeric-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    UsersComponent,
    ClickBgcolorChangeDirective,
    MouseBgcolorChangeDirective,
    TrackingDirective,
    TooltipDirective,
    TitlePipe,
    DataRangePipe,
    DateConverterPipe,
    LoaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    AgeRangeFilterPipe,
    FakeUsersComponent,
    CharactersOnlyDirective,
    NumbersOnlyDirective,
    AlphanumericOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
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
