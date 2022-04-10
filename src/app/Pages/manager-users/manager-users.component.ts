import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {

users = []
displayedColumns = ["id","email","firstName","lastName","password","groups","roles","isMEP","edit"]
dataSource = new MatTableDataSource<any>();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(public client : ApiclientService) { }

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
}
