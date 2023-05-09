import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDepartment } from 'src/app/interfaces';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  isLoading: boolean = true;
  departments: IDepartment[] = [];
  form: IDepartment = {
    name: '',
  };
  error = {
    show: false,
    msg: '',
  };

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoading = false),
    });
  }

  addDepartment(form: NgForm) {
    if (this.form.id) {
      this.departmentsService
        .editDepartment(this.form.id, {
          name: form.value.name,
        })
        .subscribe({
          next: () => {
            this.getDepartments();
            form.reset();
          },
          error: (e) => console.error(e),
        });

      return;
    }

    if (!form.value.name.trim()) {
      this.error = {
        show: true,
        msg: 'Fields required!!',
      };
      return;
    }

    this.departmentsService.addDepartment(form.value).subscribe({
      next: (res) => {
        this.getDepartments();
        form.reset();
      },
      error: (e) => console.error(e),
    });
  }

  editDepartment(data: any) {
    this.form = data;
  }

  deleteDepartment(id: number) {
    const isConfirm = confirm('¿Estás seguro de eliminar?');

    if (isConfirm) {
      this.departmentsService.deleteDepartment(id).subscribe({
        next: () => {
          this.getDepartments();
        },
        error: (e) => console.error(e),
      });
    }
  }
}
