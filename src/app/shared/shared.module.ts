import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseComponent} from './base-component/base-component.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BaseComponent
  ],
  exports: [BaseComponent]
})
export class SharedModule {
}
