import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ServerService } from 'src/app/services/server.service';
import { FileUpload } from '../models/file-upload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input() bool2: boolean;
  create = {
    subject_of_the_test: "",
    name_the_Lecturer: "",
   
  }
  
  selectedFiles: any = {};
  currentFileUpload: FileUpload = {};
  percentage: number = 0;
  successMsg: boolean = false;
  
  constructor(private uploadService: FileUploadService,private serverService: ServerService) { }

  ngOnInit(): void {
  }

  creatTest() {
    this.uploadService.setUser(this.create)
  }
  
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
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
