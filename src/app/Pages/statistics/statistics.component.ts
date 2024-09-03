import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';
import { PieComponent } from '../pie/pie.component';
import { Statistics } from 'src/app/models/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  selectedValue = 'all';
  groups: string[];

  displayedColumns = ['subArticleName', 'articleName', 'voteInFavourCount', 'voteNotInFavourCount', 'voteNeutralCount'];
  displayedColumnsTotals = ['articleName', 'voteInFavourCount', 'voteNotInFavourCount', 'voteNeutralCount'];
  dataSource = new MatTableDataSource<Statistics>();
  data: Statistics[];

  dataSourceTotals = new MatTableDataSource<Statistics>();
  dataTotals: Statistics[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private client: ApiclientService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.client.getStatistics().subscribe(response => {
      this.data = response.data;
      this.dataSource.data = this.data;
      this.groups = this.data.map(i => i.groupName).filter(this.onlyUnique);
      const articles = this.data.map(i => i.articleName).filter(this.onlyUnique);

      if (this.data && this.data.length > 0) {
        articles.forEach(article => {
          const subArticle = this.data.filter(i => i.articleName === article);
          const inFavor = subArticle.reduce((acc, val) => acc + val.inFavorCount, 0);
          const notInFavor = subArticle.reduce((acc, val) => acc + val.notInFavorCount, 0);
          const neutral = subArticle.reduce((acc, val) => acc + val.neutralCount, 0);
          const total = inFavor + notInFavor + neutral;
          this.dataTotals.push({
            subArticleName: '',
            articleName: article,
            voteCount: total,
            inFavorCount: inFavor,
            notInFavorCount: notInFavor,
            neutralCount: neutral
          } as Statistics);
        });
      }
        this.dataSourceTotals.data = this.dataTotals;
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  filter() {
    if (this.selectedValue.toLowerCase() === 'all') {
      this.dataSource.data = this.data;
    } else {
      this.dataSource.data = this.data.filter(i => i.groupName === this.selectedValue);
    }
  }

  clickRow(s: Statistics) {
    this.dialog.open(PieComponent, {
      data: {
        title: s.subArticleName,
        total: this.getTotalVotes(s),
        dataPoints: [
          { name: 'In Favour', y: s.inFavorCount / this.getTotalVotes(s) * 100 },
          { name: 'Neutral', y: s.neutralCount / this.getTotalVotes(s) * 100 },
          { name: 'Not In Favour', y: s.notInFavorCount / this.getTotalVotes(s) * 100 }
        ]
      }
    });
  }

  getTotalVotes(s: Statistics): number {
    return s.inFavorCount + s.notInFavorCount + s.neutralCount;
  }

}
