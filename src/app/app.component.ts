import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'

})
export class AppComponent {
  title = 'voteangular';
  email = ''
  role= ''

  constructor() {
    this.email = localStorage.getItem("username");
    this.role = localStorage.getItem("roles");
  }

  public logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('firstName');
    localStorage.removeItem('roles');
    window.open("/login", "_self");
  }
  public loggedIn() {
    return localStorage.getItem('username') &&
    localStorage.getItem('password');
  }
}
