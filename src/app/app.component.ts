import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

}
