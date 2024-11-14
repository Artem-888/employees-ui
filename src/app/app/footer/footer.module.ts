import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {RouterOutlet} from '@angular/router';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  exports: [FooterComponent]
})
export class FooterModule {
}
