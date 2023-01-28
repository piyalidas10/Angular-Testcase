import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { ApiService } from './services/api.service';
import { ApiTestbedService } from './services/api-testbed.service';
import { TrackingDirective } from './directives/tracking/tracking.directive';
import { ClickBgcolorChangeDirective } from './directives/click-bgcolor-change/click-bgcolor-change.directive';
import { MouseBgcolorChangeDirective } from './directives/mouse-bgcolor-change/mouse-bgcolor-change.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TitlePipe } from './pipes/title/title.pipe';
import { DataRangePipe } from './pipes/data-range/data-range.pipe';
import { DateConverterPipe } from './pipes/date-converter/date-converter.pipe';

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
    DateConverterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiService, ApiTestbedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
