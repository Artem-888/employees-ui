import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {MatToolbar} from '@angular/material/toolbar';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MatToolbar,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
