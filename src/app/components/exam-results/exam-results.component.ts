import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {
  bool3:boolean =false;
  mediocre: any;
  bool1: boolean = false;

  constructor(public fireBase: FireBaseService) { }
  test(j) {
    console.log(j);
  }
  ngOnInit(): void {
  }
  sendResult(index) {
    this.bool1 = !this.bool1;
    this.fireBase.correntResultIndex = index.value
    console.log("");

  }
  
  average() {
    this.bool3 = !this.bool3;
    var sum = 0, i = 0;
    for (; i < this.fireBase.internResult.listTestAnswers.length; i++) {
      let score = this.fireBase.internResult.listTestAnswers[i].score;
      if (score) {
        sum += +score;
        console.log(sum);

      }
    }

    this.mediocre = sum / (i);

  }

}
// for (let [key, value] of Object.entries(p)) {
//   console.log(`${key}: ${value}`);
// }


// for (let [key, value] of Object.entries(this.fireBase.internResult.listTestAnswers.score)) {
//   console.log(`${key}: ${value}`);
// }