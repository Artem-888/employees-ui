import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './components/employees/employees.component';
import {EmployeesListComponent} from './components/employees/employees-list/employees-list.component';
import {EmployeeInfoComponent} from './components/employees/employee-info/employee-info.component';
import {
  EmployeeCreateOrEditFormComponent
} from './components/employees/employee-create-or-edit-form/employee-create-or-edit-form.component';
import {TagsEditComponent} from './components/tags/tags-edit/tags-edit.component';
import {NoPageComponent} from './app/no-page/no-page.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: '',
        component: EmployeesListComponent,
      },
      {
        path: 'office',
        component: EmployeesListComponent,
      },
      {
        path: 'office/:office',
        component: EmployeesListComponent,
      },
    ],
  },
  {
    path: 'employee/:id',
    component: EmployeeInfoComponent,
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeCreateOrEditFormComponent,
  },
  {
    path: 'employee-create',
    component: EmployeeCreateOrEditFormComponent,
  },
  {
    path: 'tags-edit',
    component: TagsEditComponent,
  },
  {
    path: '**',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
