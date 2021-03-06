import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {EmployeeService} from '../../../employees/employee.service';
import {Employee} from '../../../employees/employee';

@Component({
  selector: 'app-add-employee-to-project',
  templateUrl: './add-employee-to-project.component.html',
  styleUrls: ['./add-employee-to-project.component.css']
})
export class AddEmployeeToProjectComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  formControl = new FormControl('', [Validators.required]);
  private subscription: Subscription = null;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddEmployeeToProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.subscription = this.employeeService.getAll().subscribe(
      employees => this.employees = employees
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
