import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent {

  chartOptions: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      total: number,
      dataPoints: { name: string, y: number }[],
      //voterCount: number
    }
  ) {
    this.initializeChartOptions(); // Call the initialization method
  }

  // Initialize chart options after data is assigned
  initializeChartOptions(): void {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.data.title
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: this.data.dataPoints
      }]
    };
  }

  // Function to calculate the majority
  getMajorityVote(): string {
    if (!this.data.dataPoints || this.data.dataPoints.length === 0) {
      return 'No Majority';
    }

    const voteCounts = this.data.dataPoints.map(dp => dp.y);
    const maxVote = Math.max(...voteCounts);
    const majority = this.data.dataPoints.find(dp => dp.y === maxVote);
    return majority ? majority.name : 'No Majority';
  }
}
