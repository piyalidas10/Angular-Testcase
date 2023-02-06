import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { ApiService } from './services/api/api.service';
import { ApiTestbedService } from './services/api-testbed/api-testbed.service';
import { TrackingDirective } from './directives/tracking/tracking.directive';
import { ClickBgcolorChangeDirective } from './directives/click-bgcolor-change/click-bgcolor-change.directive';
import { MouseBgcolorChangeDirective } from './directives/mouse-bgcolor-change/mouse-bgcolor-change.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TitlePipe } from './pipes/title/title.pipe';
import { DataRangePipe } from './pipes/data-range/data-range.pipe';
import { DateConverterPipe } from './pipes/date-converter/date-converter.pipe';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login/login.component';
import { AppRoutingModule } from './routing.module';
import { RequestHeaderInterceptor } from './interceptors/request-header/request-header.interceptor';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, ApiTestbedService,
    // { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
