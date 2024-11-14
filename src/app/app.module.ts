import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HeaderModule} from './app/header/header.module';
import {FooterModule} from './app/footer/footer.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient(withInterceptorsFromDi()),]
})
export class AppModule {
}
