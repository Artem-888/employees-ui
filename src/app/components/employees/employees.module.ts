import {NgModule} from '@angular/core';
import {EmployeesComponent} from './employees.component';

import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatOption, MatSelect} from "@angular/material/select";
import {EmployeesListComponent} from './employees-list/employees-list.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,

  ],
  exports: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelect,
    MatOption
  ],
})
export class EmployeesModule {
}
