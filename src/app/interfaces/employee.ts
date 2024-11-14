export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  office: string;
  phoneNumber: string;
  tags: string[];
}

export interface EmployeeRequest extends Omit<Employee, '_id'> {
}
