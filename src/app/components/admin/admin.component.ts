import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminModel, personModel } from '../models/person.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
admin:any={
  name:null,
  Id:null,
password:null,
}
 
supervisor:any={
  name:"",
  Id:"",
  password:""
}

constructor(private router:ActivatedRoute) {
  this.router.paramMap.subscribe(r=>this.admin.name=(r.get("name")));
  this.router.paramMap.subscribe(r=>this.admin.name=(r.get("Id")));
  this.router.paramMap.subscribe(r=>this.admin.name=(r.get("password")));
 this.admin();
}

  ngOnInit(): void {
  }

  Admin(){
    // this.homeService.createUser(this.personForm.value).subscribe(p => {
    //   this.homeService.setUser(p);
    //   // this.router.navigate(["/app-code"]);
      
    // }, err => {
    //   console.log('err', err);
    //     if(err.error && err.error.code === 11000) {
    //       // user exists
    //       this.errors = "User already exists";
    //       return;
    //     }
    //   }
    // );
}

creatSuperviser(){
  
}

}
