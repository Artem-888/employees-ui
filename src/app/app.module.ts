import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HeaderModule} from './app/header/header.module';
import {FooterModule} from './app/footer/footer.module';
import {SharedModule} from './shared/shared.module';
import {EmployeesModule} from './components/employees/employees.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TagsModule} from './components/tags/tags.module';
import {NoPageModule} from './app/no-page/no-page.module';

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
    EmployeesModule,
    BrowserAnimationsModule,
    RouterModule,
    TagsModule,
    NoPageModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient(withInterceptorsFromDi()),]
})
export class AppModule {
}
