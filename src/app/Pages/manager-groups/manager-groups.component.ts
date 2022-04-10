import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-groups',
  templateUrl: './manager-groups.component.html',
  styleUrls: ['./manager-groups.component.css']
})
export class ManagerGroupsComponent implements OnInit {
  
  groups = []
  displayedColumns = ["name","readableId","createdAt","edit"]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public client : ApiclientService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getGroups().subscribe(response => this.dataSource.data = response.data);
  }

  public edit(id: string) {
    window.open("/groups/edit/" + id, "_self");
  }
}
