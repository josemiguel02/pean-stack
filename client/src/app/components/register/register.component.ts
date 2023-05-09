import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { AuthService } from '../../services/auth.service';
import { ICredentials } from '../../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isLoading = false;
  user: ICredentials = {
    email: '',
    password: '',
    fullname: '',
  };
  errors = { show: false, msg: '' };
  fieldsErrors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  handleRegister() {
    this.isLoading = true;
    this.authService.register(this.user).subscribe({
      next: (res) => {
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
