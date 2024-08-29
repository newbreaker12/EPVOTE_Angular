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
    this.email = this.authService.getJWT().email;
    this.role = this.authService.getJWT().role;
    console.log(this.role);
  }

  public logout(){
    this.authService.navigateToLoginPage();
  }
  public loggedIn() {
    return this.authService.isAuthenticated();
  }
}
