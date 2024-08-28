import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public client : ApiclientService,
    public toastrService: ToastrService
    ) { }

  username = "";
  password = "";

  ngOnInit() {
  }

  public onClickLogin() {
    this.client.authenticate(this.username, this.password).subscribe(
        result => {
          if (result.data === 'ok'){
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            this.client.getUserByEmail().subscribe(
              result2 => {
                localStorage.setItem('firstName', result2.data.firstName);
                localStorage.setItem('roles', result2.data.role.name);
            window.open("/", "_self");
              });
          } else {
            this.toastrService.warning('Login failed');
            window.open("/login", "_self");
          }
        },
        error => {
          this.toastrService.warning('An error occurred during login');
        }
    );
  }
}
