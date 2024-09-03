import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';
import {LOCAL_STORAGE_SECURITY_ACCESS_TOKEN, LOCAL_STORAGE_USER_DATA} from '../../services/constant';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
  private router: Router,
    public service : ApiclientService,
    public authService : AuthService,
    public toastrService: ToastrService
    ) { }

  username = 'admin';
  password = 'pass';

  ngOnInit() {
  }

  public onClickLogin() {
    this.authService.getAccessToken(this.username, this.password).subscribe(
        response => {
            localStorage.setItem(LOCAL_STORAGE_SECURITY_ACCESS_TOKEN, response.token);
            localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(this.authService.getJWT(response.token)));
            this.router.navigate(['/home']);
            },
        error => {
          this.toastrService.warning('An error occurred during login');
        }
    );
  }
}
