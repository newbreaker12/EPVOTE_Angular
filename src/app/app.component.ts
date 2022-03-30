import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voteangular';
  email = ''
  roles= ''
  
  constructor() {
    this.email = localStorage.getItem("username");
    this.roles = localStorage.getItem("roles");
  }

  public hasRole(roleName: string) {
    if (this.roles) {
      return this.roles.split(',').findIndex(element => {
        if (element.includes(roleName))
          return true;
      }) !== -1
    }
  }

  public logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('firstName');
    localStorage.removeItem('roles');
    window.open("/login", "_self");
  }

}
