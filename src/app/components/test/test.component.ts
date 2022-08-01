import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public chartOptions:any;
  constructor(public fireBase: FireBaseService ) 
  { 
    this.chartOptions = {
    series: [
      {
        name: "Desktops",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    title: {
      text: "Product Trends by Month",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: []
    }
  }; 
}

  ngOnInit(): void {
    for (var i=0; i < this.fireBase.internResult.listTestAnswers.length; i++) {
      let score = this.fireBase.internResult.listTestAnswers[i].score;
      this.chartOptions.series[0].data.push(score);
    }
    for (var i=0; i < this.fireBase.internResult.listTestAnswers.length; i++) {
      let subject = this.fireBase.internResult.listTestAnswers[i].subject_of_the_test;
      this.chartOptions.xaxis.categories.push(subject);
    }
  }
  
 

}



