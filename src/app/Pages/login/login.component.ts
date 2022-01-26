import { Component, OnInit } from '@angular/core';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public client : ApiclientService) { }

  username = "";
  password = "";

  ngOnInit() {
  }

  public onClickLogin() {
    this.client.authenticate(this.username, this.password).subscribe(
        result => {
          if (result === 'TRUE'){
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            window.open("/", "_self");
          } else {
            window.open("/login", "_self");
          }
        },
        error => {
        }
    );
}

}

