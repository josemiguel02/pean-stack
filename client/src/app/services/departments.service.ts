import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private URL_API = 'http://localhost:5000/api/departments';

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<IDepartment[]>(this.URL_API);
  }

  addDepartment(department: IDepartment) {
    return this.http.post<IDepartment>(this.URL_API, department);
  }

  editDepartment(id: number, data: IDepartment) {
    return this.http.put(`${this.URL_API}/${id}`, data);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
