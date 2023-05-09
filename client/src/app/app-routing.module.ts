import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { CardsComponent } from './components/cards/cards.component';
import { AuthGuard, LoggedInGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: CardsComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
