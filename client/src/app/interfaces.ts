export interface IClient {
  id?: number;
  firstname: string;
  lastname: string;
  idDepartment?: number
}

export interface IDepartment {
  id?: number
  name: string
}

export interface ICredentials {
  email: string;
  password: string;
  fullname?: string
}
