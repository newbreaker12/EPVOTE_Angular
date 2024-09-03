import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ApiclientService } from 'src/app/apiclient.service';
import { CreateSubarticleComponent } from '../create-subarticle/create-subarticle.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  articleId = 0;
  article: any;
  subArticles = [];
  displayedColumns = ["name", "description", "edit", "delete"];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public client: ApiclientService,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get("id"));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getArticle(this.articleId).subscribe(response => {
      this.article = response.data;
    });
    this.client.getSubArticles(this.articleId).subscribe(response => {
      this.subArticles = response.data;
      this.dataSource.data = response.data;
    });
  }

  public getStatus(session) {
    if (session === null) {
      return "Never voted";
    } else {
      const from = new Date(session.from);
      const to = new Date(session.to);
      const now = new Date(new Date());
      if (from > now) {
        return "Not yet started";
      } else if (from < now && to > now) {
        return "Voting";
      } else if (now > to) {
        return "Voted";
      }
    }
  }

  public edit(id: number) {
    window.open("/article/edit/" + id, "_self");
  }
  public createSession(id: string) {
    window.open("/session/create/" + id, "_self");
  }
  public addSubArticle() {
    const dialogRef = this.dialog.open(CreateSubarticleComponent, {
      width: '250px',
      data: {
        subArticle: {
          articleId: this.articleId
        },
        type: "save"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.client.getSubArticles(this.articleId).subscribe(response => {
        this.subArticles = response.data;
        this.dataSource.data = response.data;
      });
    });
  }
  public editSubArticle(subArticle: any) {
    const dialogRef = this.dialog.open(CreateSubarticleComponent, {
      width: '250px',
      data: {
        subArticle: subArticle,
        type: "update"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.client.getSubArticles(this.articleId).subscribe(response => {
        this.subArticles = response.data;
        this.dataSource.data = response.data;
      });
    });
  }
  public deleteSubArticle(subArticle: any) {
    this.client.deleteSubArticle(subArticle.id).subscribe(response => {
      this.client.getSubArticles(this.articleId).subscribe(response => {
        this.subArticles = response.data;
        this.dataSource.data = response.data;
      });
    });
  }

}
