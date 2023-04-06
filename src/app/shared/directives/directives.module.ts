import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking/tracking.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { TableStickyHeaderDirective } from './table-sticky-header/table-sticky-header.directive';
import { NumbersOnlyDirective } from './numbers-only/numbers-only.directive';
import { MouseBgcolorChangeDirective } from './mouse-bgcolor-change/mouse-bgcolor-change.directive';
import { ClickBgcolorChangeDirective } from './click-bgcolor-change/click-bgcolor-change.directive';
import { CharactersOnlyDirective } from './characters-only/characters-only.directive';
import { AlphanumericOnlyDirective } from './alphanumeric-only/alphanumeric-only.directive';

@NgModule({
  declarations: [
    TrackingDirective,
    TooltipDirective,
    TableStickyHeaderDirective,
    NumbersOnlyDirective,
    MouseBgcolorChangeDirective,
    ClickBgcolorChangeDirective,
    CharactersOnlyDirective,
    AlphanumericOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrackingDirective,
    TooltipDirective,
    TableStickyHeaderDirective,
    NumbersOnlyDirective,
    MouseBgcolorChangeDirective,
    ClickBgcolorChangeDirective,
    CharactersOnlyDirective,
    AlphanumericOnlyDirective
  ]
})
export class DirectivesModule { }
