import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './components/employees/employees.component';
import {EmployeesListComponent} from './components/employees/employees-list/employees-list.component';


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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
