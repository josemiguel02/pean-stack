import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { AuthService } from '../../services/auth.service';
import { ICredentials } from '../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoading = false;
  user: ICredentials = {
    email: '',
    password: '',
  };

  errors = { show: false, msg: '' };
  fieldsErrors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    this.isLoading = true;
    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        Cookies.set('jwt_token', res.token, { expires: 7 });

        localStorage.setItem('data_user', JSON.stringify(res.user));
        location.reload();
      },
      error: ({ error }) => {
        this.fieldsErrors = error.fieldsErrors ?? {};

        if (error.error) {
          this.errors = {
            show: true,
            msg: error.error,
          };
        }

        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
}
