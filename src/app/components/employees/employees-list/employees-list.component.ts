import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/base-component/base-component.component';
import {catchError, EMPTY, finalize, mergeMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'office'];

  ngOnInit() {
    this.activeRoute.paramMap.pipe(
      mergeMap(params => {
        const office = params.get('office') || '';
        return this.employeeService.getEmployees(office === 'all' ? '' : office)
          .pipe(
            catchError((err) => {
              this.showErrorNotification(err.error.message);
              return EMPTY;
            }),
            finalize(() => this.loading$.next(false)),
            takeUntil(this.destroy)
          );
      }),
      takeUntil(this.destroy),
    ).subscribe((employees) => this.employeeService.employees.next(employees));
  }

  onCLickEmployees(id: string) {
    this.router.navigate([`employee/${id}`]);
  }
}
