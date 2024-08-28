import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiclientService } from 'src/app/apiclient.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles = []
  displayedColumns = ["name","group.name","description","createdAt","status","actions"]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public client : ApiclientService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getArticles().subscribe(response => this.dataSource.data = response.data);
  }

  public getStatus(session){
    if(session === null){
      return "Never voted";
    } else {
      const from = new Date(session.from)
      const to = new Date(session.to)
      const now = new Date(new Date())
      if (from > now) {
        return "Not yet started";
      }else if (from < now && to > now)
      {
        return "Voting";
      }else if(now > to )
      {
        return "Voted";
      }
    }
  }

  public edit(id: string) {
    window.open("/article/edit/" + id, "_self");
  }
  public createSession(id: string) {
    window.open("/session/create/" + id, "_self");
  }

}
