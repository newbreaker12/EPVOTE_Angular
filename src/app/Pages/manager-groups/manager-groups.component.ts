import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-groups',
  templateUrl: './manager-groups.component.html',
  styleUrls: ['./manager-groups.component.css']
})
export class ManagerGroupsComponent implements OnInit {
  
  groups = []
  displayedColumns = ["name","readableId","createdAt","edit","delete"]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public client : ApiclientService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getGroups().subscribe(response => this.dataSource.data = response.data);
  }

  public edit(id: string) {
    window.open("/groups/edit/" + id, "_self");
  }
  public delete(id: string) {
    this.client.deleteGroup(id).subscribe(response => {
      if(response.data.status !== 200) {
        this.toastrService.error(response.data); 
      } else {
        this.client.getGroups().subscribe(response => this.dataSource.data = response.data);
      }
    });
  }
}
