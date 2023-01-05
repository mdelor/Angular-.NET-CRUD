import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this._employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
            },
          });
        }
      },
    });
  }

  updateEmployee() {
    this._employeeService.updateEmployee(
      this.employeeDetails.id,
      this.employeeDetails
    )
    .subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      }
    });
  }

  deleteEmployee(id:string) {
    this._employeeService.deleteEmployee(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      }
    })
  }
}
