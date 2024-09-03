import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {ApiclientService} from './apiclient.service';

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
      private authService: AuthService,
      private apiclientService: ApiclientService
  ) {
    this.email = this.authService.getJWT()?.email;
    this.role = this.authService.getJWT()?.role;
  }

  public logout(){
    this.authService.navigateToLoginPage();
  }
  public loggedIn() {
    return this.authService.isAuthenticated();
  }

  public getPinCode() {
    return this.apiclientService.getPinCode().subscribe(
        response => {
        },
        error => {
        }
    )
  }
}
