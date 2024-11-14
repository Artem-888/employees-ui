import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/base-component/base-component.component';
import {catchError, EMPTY, finalize, mergeMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
})
export class EmployeeInfoComponent extends BaseComponent implements OnInit {

  ngOnInit() {
    this.activeRoute.paramMap.pipe(
      mergeMap((params) => {
        return this.employeeService.getEmployee(params.get('id')).pipe(
          catchError((err) => {
            this.showErrorNotification(err.error.message);
            return EMPTY;
          }),
          finalize(() => {
            this.loading$.next(false);
          }),
          takeUntil(this.destroy),
        )
      }),
      takeUntil(this.destroy),
    ).subscribe((employee) => this.employeeService.employee.next(employee));
  }

  navigate(id?: string) {
    !id ? this.router.navigate(['']) : this.router.navigate([`employee-edit/${id}`]);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).pipe(
      catchError((err) => {
        this.showErrorNotification(err.error.message);
        return EMPTY;
      }),
      finalize(() => {
        this.loading$.next(false);
      }),
      takeUntil(this.destroy),
    ).subscribe(() => {
      this.showInfoNotification('Employee has been deleted.');
      this.navigate();
    });
  }

  getRandomColor(index: number): string {
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#F6FF33', '#FF8033',
      '#33FFF6', '#8033FF', '#33FFB5', '#B533FF', '#FFB533', '#B53333',
      '#33FF5D', '#5D33FF', '#FF8A33', '#33A6FF', '#FF5733', '#FF33C6',
      '#DAF733', '#FF5733', '#D3FF33', '#33F7FF', '#FF3357', '#F7FF33',
      '#FF835D', '#33FFD8', '#FF33C0', '#FF5733', '#A5FF33'
    ];
    return colors[index % colors.length];
  }

}
