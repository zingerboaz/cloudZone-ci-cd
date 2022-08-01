import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ServerService } from 'src/app/services/server.service';
import { FileUpload } from '../models/file-upload';

@Component({
  selector: 'app-upload-intern',
  templateUrl: './upload-intern.component.html',
  styleUrls: ['./upload-intern.component.css']
})
export class UploadInternComponent implements OnInit {
  SelectTest={
    subject_of_the_test:"",
    _id:""
  }
selectedFiles: any = {};
currentFileUpload: FileUpload = {};
percentage: number = 0;
successMsg: boolean = false;


constructor(private uploadService: FileUploadService,public fireBaseService: FireBaseService,private serverService: ServerService) { 
  
    
}

  ngOnInit(): void {
    
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  selectTest(){
    
  }
  
  onSelect(){
    for(let i of this.fireBaseService.allTests){      
      if(i._id == this.SelectTest._id){
        this.SelectTest.subject_of_the_test = i.subject_of_the_test;
        break;
      }
    }
    console.log(this.SelectTest);
    this.uploadService.SelectTest=this.SelectTest;
    
  }
  sendForm(){}
  
  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileInternToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(Number(percentage));
        if (Number(percentage) === 100) {
          this.successMsg = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
