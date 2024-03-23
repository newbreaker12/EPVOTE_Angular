import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Correct import for MAT_DIALOG_DATA



@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      total: number,
     dataPoints: { name: string, y: number}[]
    }) {
  }

  chartOptions = {
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
	}
}
