import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-practises',
  templateUrl: './practises.component.html',
  styleUrls: ['./practises.component.css']
})
export class PractisesComponent implements OnInit {

  isLoading: Boolean = true;
  error: String = "";
  errors: String = "";

  constructor(private serverService: ServerService,
    public fireBase: FireBaseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTests()
  }

  getAllTests() {
    this.serverService.getWithTokenArry("api/tests/getAllTests").subscribe(data => {
      this.fireBase.allTests = data as [];
      this.isLoading = false;
    })
  }

  showImg(index) {
    this.fireBase.currentTestIndex = index;
    console.log('kjbdsvjkbvdsjkbdsvjkbjkvds');

    this.router.navigate(['/test-page'])
  }

  sendTest(data: any, testBtn: any) {
    const test = { listTestQuestions: data };
    this.serverService.putWithToken("api/users/updateUser", test).subscribe(data => {
      this.showImg(testBtn.value)
      console.log({ "data from db": data })
    }, err => {
      this.error = err.error;
    })
  }

  examResults() {
    this.serverService. getWithToken("api/users/getUser").subscribe(data => {
      this.fireBase.internResult = data
      console.log({ "data from db": data })
    }, err => {
      console.error(err);
      this.errors = err;
    })
  this.router.navigate(['/app-exam-results'])
  }


}
