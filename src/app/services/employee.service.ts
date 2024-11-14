import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Employee, EmployeeRequest} from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://localhost:3000/';
  employee = new BehaviorSubject<Employee | null>(null);
  employees = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) {
  }

  getEmployees(office?: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}employee${office ? `?office=${office}` : ''}`);
  }

  getEmployee(id: string | null): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}employee/${id}`);
  }

  createEmployee(employee: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}employee`, employee);
  }

  updateEmployee(employeeId: string, employeeForm: EmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}employee/${employeeId}`, employeeForm);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}employee/${id}`);
  }

}
