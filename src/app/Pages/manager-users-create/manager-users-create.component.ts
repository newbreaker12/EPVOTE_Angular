import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-users-create',
  templateUrl: './manager-users-create.component.html',
  styleUrls: ['./manager-users-create.component.css']
})
export class ManagerUsersCreateComponent implements OnInit {

  id=''
  email=''
  phoneNumber=''
  firstName=''
  lastName=''
  password=''

  groups = [];
  roles = [];
  groupId= '';
  roleId = '';
  groupName = '';
  roleName = '';

  constructor(public client : ApiclientService,
    private readonly route: ActivatedRoute,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.client.getUser(this.id).subscribe(response =>
        {
          this.email = response.data.email,
          this.firstName = response.data.firstName,
          this.lastName = response.data.lastName,
          this.password = response.data.password,
          this.roleId = response.data.roleId,
          this.groupId = response.data.groupId,
            this.phoneNumber = response.data.phoneNumber
        });
    }
    this.getGroups()
    this.getRoles()
  }

  public getGroups(){
    this.client.getGroups().subscribe(response => this.groups = response.data);
  }
  public getRoles(){
    this.client.getRoles().subscribe(response => this.roles = response.data);
  }

  public create(){

    if (!this.email || !this.firstName || !this.lastName || !this.password || !this.roleId || !this.groupId) {
      this.toastrService.error('All fields are required');
      return;
    }

    const body = { firstName: this.firstName, lastName: this.lastName, email: this.email,
      phoneNumber: this.phoneNumber,
    password: this.password, roleId: this.roleId, groupId: this.groupId}
    this.client.createUser(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open('/users', '_self');
    } else {
      this.toastrService.error(response.data);
    }
  }, error => {
      this.toastrService.error(error.error.data);
    })
  }
  public edit(){
    if (!this.email || !this.firstName || !this.lastName || !this.password || !this.roleId || !this.groupId) {
      this.toastrService.error('All fields are required');
      return;
    }

    const body = {
      id: Number(this.id), firstName: this.firstName, lastName: this.lastName, email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password, roleId: this.roleId, groupId: this.groupId}
    this.client.editUser(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open('/users', '_self');
    } else {
      this.toastrService.error(response.data);
    }}, error => {
      this.toastrService.error(error.error.data);
    })
  }


}

