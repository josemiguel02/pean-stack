import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user = {
    email: '',
    fullname: '',
  };

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('data_user')!);
  }
}
