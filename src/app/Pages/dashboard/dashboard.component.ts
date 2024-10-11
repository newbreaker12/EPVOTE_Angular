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

  // Array to hold the articles fetched from the API
  articles = []
  displayedColumns = ["name","group.name","description","createdAt","status","actions"]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public client : ApiclientService) { }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetching articles from the API and populating the table
    this.client.getArticles().subscribe(response => {
      console.log('API Response:', response); // log the response
      this.dataSource.data = response.data;
    });
  }

// Method to determine the voting status based on session data
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

  // Method to return the icon based on the voting status
  public getStatusIcon(session) {
    const status = this.getStatus(session);
    switch (status) {
      case "Never voted":
        return "close"; // Example icon for "Never voted"
      case "Not yet started":
        return "hourglass_empty"; // Example icon for "Not yet started"
      case "Voting":
        return "how_to_vote"; // Example icon for "Voting"
      case "Voted":
        return "check_circle"; // Example icon for "Voted"
      default:
        return null;
    }
  }

// Method to return the CSS class based on the voting status
  public getStatusClass(session) {
    const status = this.getStatus(session);
    switch (status) {
      case "Never voted":
        return "status-never-voted";
      case "Not yet started":
        return "status-not-started";
      case "Voting":
        return "status-voting";
      case "Voted":
        return "status-voted";
      default:
        return "";
    }
  }

  // Method to navigate to the edit article page when the edit button is clicked
  public edit(id: string) {
    window.open("/article/edit/" + id, "_self");
  }

    // Method to navigate to the session creation page when the "Add session time" button is clicked
  public createSession(id: string) {
    window.open("/session/create/" + id, "_self");
  }

}
