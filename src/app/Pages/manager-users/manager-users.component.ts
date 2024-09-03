import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {

users = []
displayedColumns = ["email","firstName","lastName","groups","roles","actions"]
dataSource = new MatTableDataSource<any>();

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(public client : ApiclientService, private toastrService: ToastrService) { }

ngOnInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.client.getUsers().subscribe(response => {
    let data = response.data;
    this.dataSource.data = data;
  }, error => {
    this.toastrService.error('Failed to load users.', 'Error');
  });
}

public edit(id: string) {
  window.open("/users/edit/" + id, "_self");
}

public delete(id: string) {
  this.client.deleteUser(id).subscribe(response => {
    this.toastrService.success('User deleted successfully!', 'Success');
    this.client.getUsers().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }, error => {
    let errorMessage = 'Failed to delete user. Please try again later.';

    // Access different properties based on the error structure
    if (error.error) {
      if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.data && typeof error.error.data === 'string') {
        errorMessage = error.error.data;
      }
    }

    this.toastrService.error(errorMessage, 'Error');
  });
}

}
