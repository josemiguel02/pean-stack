import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private URL_API: string = 'http://localhost:5000/api/clients';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<IClient[]>(this.URL_API);
  }

  addClient(client: IClient) {
    return this.http.post<IClient>(this.URL_API, client);
  }

  editClient(id: number, data: IClient) {
    return this.http.put(`${this.URL_API}/${id}`, data);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
