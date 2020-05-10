import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TABS_COMPONENTS_DECLARATIONS } from './components';
import { TabContent } from './directives/content.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [...TABS_COMPONENTS_DECLARATIONS, TabContent],
  exports: [...TABS_COMPONENTS_DECLARATIONS, TabContent],
})
export class TabsModule { }