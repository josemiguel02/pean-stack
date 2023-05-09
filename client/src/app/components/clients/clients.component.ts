import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { DepartmentsService } from '../../services/departments.service';
import { IClient, IDepartment } from 'src/app/interfaces';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  isLoading: boolean = true;
  clients: IClient[] = [];
  departments: IDepartment[] = [];
  form: IClient = {
    firstname: '',
    lastname: '',
    idDepartment: undefined,
  };
  error = {
    show: false,
    msg: ''
  }

  constructor(
    private clientService: ClientsService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getDepartments();
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: (res) => {
        this.clients = res;
      },
      error: (e) => console.error(e),
      complete: () => (this.isLoading = false),
    });
  }

  addClient(form: NgForm) {
    if (this.form.id) {
      this.clientService
        .editClient(this.form.id, {
          firstname: form.value.firstname,
          lastname: form.value.lastname,
          idDepartment: form.value.idDepartment,
        })
        .subscribe({
          next: () => {
            this.getClients();
            form.reset();
          },
          error: (e) => console.error(e),
        });

      return;
    }

    if (!form.value.firstname.trim() || !form.value.lastname || !form.value.idDepartment) {
      this.error = {
        show: true,
        msg: 'Fields required!!'
      }
      return
    }

    this.clientService.addClient(form.value).subscribe({
      next: (res) => {
        this.getClients();
        form.reset();
      },
      error: (e) => console.error(e),
    });
  }

  deleteClient(id: number) {
    const isConfirm = confirm('¿Estás seguro de eliminar?');

    if (isConfirm) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.getClients();
        },
        error: (e) => console.error(e),
      });
    }
  }

  editClient(data: any) {
    this.form = { ...data, idDepartment: data.id_department };
  }

  getDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => console.error(err),
    });
  }
}
