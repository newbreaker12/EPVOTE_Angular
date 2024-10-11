import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  // Define displayed columns for the table
  displayedColumns: string[] = ["articleName", "subArticleName", "voteType"];

  // Data source for MatTable
  dataSource = new MatTableDataSource<any>();

  // Array to store unique article names
  uniqueArticles: string[] = [];

  // Store selected article name for dropdown
  selectedArticle: string = '';

  // Paginator and Sort elements
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private client: ApiclientService, private toastrService: ToastrService) {}

  ngOnInit() {
    // Fetch data and initialize paginator and sort after data is loaded
    this.fetchData();
  }

  fetchData() {
    // Fetch votes from the service
    this.client.getVotes().subscribe(
      response => {
        // Assuming the response contains the data in 'data'
        if (response && response.data) {
          // Assign response data to MatTable data source
          this.dataSource.data = response.data;

          // Assign paginator and sort after the data is set
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // Extract unique article names for the dropdown
          this.uniqueArticles = [...new Set(response.data.map((item: any) => item.articleName))] as string[];

          // Set up default filterPredicate to allow for both filters to work together
          this.dataSource.filterPredicate = (data: any, filter: string) => {
            const searchTerm = filter.trim().toLowerCase();
            return data.articleName.toLowerCase().includes(searchTerm) ||
                   data.subArticleName.toLowerCase().includes(searchTerm) ||
                   data.voteType.toLowerCase().includes(searchTerm);
          };
        }
      },
      error => {
        // Show error toast if data fetching fails
        this.toastrService.error('Failed to load voting data');
      }
    );
  }

  // Apply text filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Filter by selected article
  filterByArticle(articleName: string) {
    if (articleName) {
      this.dataSource.filterPredicate = (data: any, filter: string) => data.articleName === filter;
      this.dataSource.filter = articleName;
    } else {
      // If no article is selected, reset the filter
      this.dataSource.filter = '';
    }
  }

  // Clear all filters
  clearFilters(searchInput: HTMLInputElement) {
    // Clear text search input
    searchInput.value = '';

    // Clear dropdown selection
    this.selectedArticle = '';

    // Reset dataSource filter
    this.dataSource.filter = '';

    // Reset filterPredicate to default for all filters to work
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return data.articleName.toLowerCase().includes(searchTerm) ||
             data.subArticleName.toLowerCase().includes(searchTerm) ||
             data.voteType.toLowerCase().includes(searchTerm);
    };
  }
}
