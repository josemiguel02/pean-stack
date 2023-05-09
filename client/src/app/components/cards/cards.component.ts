import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  departmentsLength = 0;
  clientsLength = 0;
  isLoadingDepartments: boolean = true;
  isLoadingClients: boolean = true;

  constructor(
    public clientService: ClientsService,
    public departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getClients();
  }

  getDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (res) => {
        this.departmentsLength = res.length;
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoadingDepartments = false),
    });
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: (res) => {
        this.clientsLength = res.length;
      },
      error: (e) => console.error(e),
      complete: () => (this.isLoadingClients = false),
    });
  }
}
