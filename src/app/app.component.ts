import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'

})
export class AppComponent {
  title = 'voteangular';
  email = ''
  role= ''

  constructor(
      private authService: AuthService
  ) {
    this.email = localStorage.getItem('username');
    this.role = localStorage.getItem('roles');
  }

  public logout(){
    this.authService.navigateToLoginPage();
  }
  public loggedIn() {
    return localStorage.getItem('username') &&
    localStorage.getItem('password');
  }
}
