import {Component, inject, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {TagService} from '../../services/tag.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-base-component',
  template: '',
})
export class BaseComponent implements OnDestroy {
  loading$ = new BehaviorSubject<boolean>(true);

  protected destroy = new Subject();
  protected router: Router = inject(Router);
  protected activeRoute = inject(ActivatedRoute);
  protected employeeService = inject(EmployeeService);
  protected tagService = inject(TagService);
  private snackBar = inject(MatSnackBar);

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  protected showErrorNotification(message: string, duration = 5000) {
    return this.snackBar.open(message, 'Close', {panelClass: ['notification-error'], verticalPosition: 'top', duration});
  }

  protected showInfoNotification(message: string, duration = 5000) {
    return this.snackBar.open(message, 'Ok', {panelClass: ['notification-info'], verticalPosition: 'top', duration});
  }
}
