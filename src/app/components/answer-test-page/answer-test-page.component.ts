import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-answer-test-page',
  templateUrl: './answer-test-page.component.html',
  styleUrls: ['./answer-test-page.component.css']
})
export class AnswerTestPageComponent implements OnInit {
  error: any;

  test: {
    _id: String,
    score: Number | null,
  }[] = []
  constructor(public fireBase: FireBaseService, private serverService: ServerService) {
    for(let i of  fireBase.allUsers[fireBase.currentAnswerTestIndex].listTestAnswers){
      this.test.push({_id:i._id , score:null});
    }
  }

  ngOnInit(): void {
  }

  updateScore(index) {
    const score = { _id: this.test[index]._id, score: this.test[index].score }
    console.log(score);

    this.serverService.putWithToken("api/users/updateScore", score).subscribe(data => {
      console.log({ "data from db": data })
    this.average
    }, err => {
      this.error = err.error;
    })
  }
  average() {
    var sum = 0
    for (var i = 1; i < this.fireBase.internResult.listTestAnswers.score.length; i++) {
      sum += this.fireBase.internResult.listTestAnswers.score[i]
    }
    var mediocre = sum / i
  }


}
// <div *ngFor='let item of fireBase.allUsers[fireBase.currentAnswerTestIndex].listTestAnswers'>

//     <img  [src]="item.url" alt="this is img" style="width: 700px; height: 500px;">
// </div>
// <br>
