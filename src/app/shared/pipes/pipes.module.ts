import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate/truncate.pipe';
import { TitlePipe } from './title/title.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { MaskDataPipe } from './mask-data/mask-data.pipe';
import { DateConverterPipe } from './date-converter/date-converter.pipe';
import { DataRangePipe } from './data-range/data-range.pipe';
import { AgeRangeFilterPipe } from './age-range-filter/age-range-filter.pipe';

@NgModule({
  declarations: [
    AgeRangeFilterPipe,
    DataRangePipe,
    DateConverterPipe,
    MaskDataPipe,
    OrderByPipe,
    TitlePipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgeRangeFilterPipe,
    DataRangePipe,
    DateConverterPipe,
    MaskDataPipe,
    OrderByPipe,
    TitlePipe,
    TruncatePipe
  ]
})
export class PipesModule { }
