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
displayedColumns = ["id","email","firstName","lastName","groups","roles","isMEP","edit","delete"]
dataSource = new MatTableDataSource<any>();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(public client : ApiclientService, private toastrService: ToastrService) { }

ngOnInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.client.getUsers().subscribe(response =>
    {
      let data = response.data;
      this.dataSource.data = data;
      });

}

public edit(id: string) {
  window.open("/users/edit/" + id, "_self");
}

public delete(id: string) {
  this.client.deleteUser(id).subscribe(response => {
    this.client.getUsers().subscribe(response => this.dataSource.data = response.data);
  }, error => {
    console.log(error);
    this.toastrService.error(error.error.data);
  });
}

}
