import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../shared/base-component/base-component.component';
import {catchError, EMPTY, finalize, takeUntil} from 'rxjs';
import {EmployeeRequest} from '../../../interfaces/employee';

@Component({
  selector: 'app-employee-create-or-edit-form',
  templateUrl: './employee-create-or-edit-form.component.html',
})
export class EmployeeCreateOrEditFormComponent extends BaseComponent implements OnInit {
  employeeForm!: FormGroup;
  offices = ['Riga', 'Tallinn', 'Vilnius'];
  isEditMode = false;
  currentId: string | null = null

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.currentId = this.activeRoute.snapshot.paramMap.get('id');

    this.tagService.getTags().pipe(
      catchError((err) => {
        this.showErrorNotification(err.error.message);
        return EMPTY;
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy)
    ).subscribe(tags => {
      this.tagService.tags.next(tags);
    });

    if (this.currentId) {
      this.isEditMode = true;
      this.loading$.next(true);
      this.employeeService.getEmployee(this.currentId)
        .pipe(
          catchError((err) => {
            this.showErrorNotification(err.error.message);
            return EMPTY;
          }),
          finalize(() => this.loading$.next(false)),
          takeUntil(this.destroy)
        )
        .subscribe((employee) => {
          this.employeeService.employee.next(employee);
          this.initializeForm(employee);
        });
    } else {
      this.isEditMode = false;
      const emptyEmployee = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        office: '',
        tags: []
      };
      this.initializeForm(emptyEmployee);
    }
  }

  initializeForm(employee: EmployeeRequest) {
    const tagControls = employee.tags.map((tag: string) => this.fb.control(tag));
    this.employeeForm = this.fb.group({
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      phoneNumber: [employee.phoneNumber, Validators.required],
      office: [employee.office || '', Validators.required],
      tags: this.fb.array(tagControls),
    });
  }

  get tags() {
    return (this.employeeForm.get('tags') as FormArray);
  }

  isTagSelected(tagName: string): boolean {
    return this.tags.controls.some(control => control.value === tagName);
  }

  toggleTagSelection(tagName: string, isChecked: boolean) {
    if (isChecked) {
      this.tags.push(this.fb.control(tagName));
    } else {
      const index = this.tags.controls.findIndex(control => control.value === tagName);
      if (index !== -1) {
        this.tags.removeAt(index);
      }
    }
  }

  onSubmit(): void {
    if (!this.employeeForm.valid) {
      return;
    }
    const formData: EmployeeRequest = this.employeeForm.value;
    if (this.isEditMode) {
      const employeeId = this.employeeService.employee.value?._id || '';
      this.updateEmployee(employeeId, formData);
    } else {
      this.createEmployee();
    }
  }

  private updateEmployee(id: string, formData: EmployeeRequest): void {
    this.loading$.next(true);
    this.employeeService.updateEmployee(id, formData)
      .pipe(
        catchError((err) => {
          this.showErrorNotification(err.error.message);
          return EMPTY;
        }),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy),
      )
      .subscribe((employee) => {
        this.employeeService.employee.next(employee);
        this.showInfoNotification('Update successful!');
        this.goBack();
      });
  }

  private createEmployee(): void {
    this.loading$.next(true);
    this.employeeService.createEmployee(this.employeeForm.value)
      .pipe(
        catchError((err) => {
          this.showErrorNotification(err.error.message);
          return EMPTY;
        }),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy)
      )
      .subscribe((newEmployee) => {
        this.employeeService.employee.next(newEmployee);
        this.showInfoNotification('New employee creation was successful!');
        this.router.navigate([`/employee/${newEmployee._id}`]);
      });
  }

  goBack() {
    this.router.navigate([this.currentId ? `/employee/${this.currentId}` : '']);
  }

}
