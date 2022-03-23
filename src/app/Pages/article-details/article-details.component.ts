import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  articleId = 0;
  article: any
  subArticles = []
  displayedColumns = ["name","group.name","description","createdAt","status","edit","session"]
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public client : ApiclientService, 
    private readonly route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get("id"));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getArticle(this.articleId).subscribe(response => this.article = response.data);
    this.client.getSubArticles(this.articleId).subscribe(response => 
      {
        this.subArticles = response.data;
        this.dataSource.data = response.data;
      });
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
