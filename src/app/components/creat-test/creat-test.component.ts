import { Component, Input, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-creat-test',
  templateUrl: './creat-test.component.html',
  styleUrls: ['./creat-test.component.css']
})
export class CreatTestComponent implements OnInit {
  @Input() bool2: boolean;
  create = {
    subject_of_the_test: "",
    name_the_Lecturer: ""
  }
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
  }
  creatTest() {
    this.serverService.postWithToken("api/tests/createTest", this.create).subscribe(data => {
      console.log(data)

    })
  }
}
