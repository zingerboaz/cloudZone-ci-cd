import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-manager-update-test',
  templateUrl: './manager-update-test.component.html',
  styleUrls: ['./manager-update-test.component.css']
})
export class ManagerUpdateTestComponent implements OnInit {
  error:any
 
  selectUser={
    full_name:"",
    _id:""
  }
  
  // updateTestForm: FormGroup

  // arr = [60,70,80,85,90,95,100];


  constructor(public fireBaseService: FireBaseService,private serverService: ServerService) {
    
  }

  ngOnInit(): void {

    // this.updateTestForm = new FormGroup({
    //   users: new FormControl('', [Validators.required]),
    //   tests: new FormControl('', [Validators.required]),
    //   urls: new FormControl('', [Validators.required]),
    //   score: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    // });
  }
  sendForm() { }
  sendTest() { }
  
  
  onSelect(){
    for(let i of this.fireBaseService.allUsers){      
      if(i._id == this.selectUser._id){
        this.selectUser.full_name = i.full_name;
        break;
      }
    }
    console.log(this.selectUser.full_name);
    
    
    this.serverService.deleteWithToken("api/users/deleteUser/", this.selectUser).subscribe(data => {
   
      console.log({ "data from db": data })
    }, err => {
      this.error = err.error;
    })
  }
}





  