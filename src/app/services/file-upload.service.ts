import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../components/models/file-upload';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  _test = {};
  answersIntern={};
  error="";
  SelectTest={}; 
  
  private basePath = '/uploads';
  private basePath1 ='/upload-intrn';


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private serverService: ServerService) { }
  
  
  pushFileToStorage(fileUpload: any): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);


    uploadTask.snapshotChanges().pipe(
      finalize(() => {

        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log("url of download", downloadURL);

          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;

          this.saveFileData(fileUpload);
          console.log(fileUpload.url);
        });
      })
    ).subscribe(item => {
      console.log("this is item", item)
      
    });



    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    // this.db.list(this.basePath).push(fileUpload);
    console.log( "data from service" );
    

      const data = { ...fileUpload, ...this._test };
  console.log(data);

    this.serverService.postWithToken("api/tests/createTest", data).subscribe(data => {
      console.log({ "data from db": data })

    })
  }

  setUser(data: any): void {
    this._test = data;
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    console.log("getFiles");

    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: any): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }


  
  
  pushFileInternToStorage(fileUpload: any): Observable<number | undefined> {
    const filePath = `${this.basePath1}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);


    uploadTask.snapshotChanges().pipe(
      finalize(() => {

        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log("url of download", downloadURL);

          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileDataTest(fileUpload);
         
          console.log(fileUpload.url);
        });
      })
    ).subscribe(item => {
      console.log("this is item", item)
      
    });



    return uploadTask.percentageChanges();
  }
  
  private saveFileDataTest(fileUpload: FileUpload): void {
    console.log("save File work");
    console.log( fileUpload );
     const fileUpload1={...fileUpload,...this.SelectTest}
    this.answersIntern=fileUpload1;
    const answerintern={ listTestAnswers: fileUpload1};
    this.serverService.putWithToken("api/users/updateUser", answerintern).subscribe(data => {
    console.log({ "data from db": data })
    }, err => {
      this.error = err.error;
    })
    
    
    
    
    //  localStorage.setItem('urls', JSON.stringify(fileUpload)) 
  // let data = JSON.parse(  localStorage.getItem('urls'));
  // console.log(typeof data,data);
   }



}

export function success_uplpad() {

}





//   const data = { ...fileUpload, ...this._test };
  // console.log(data);

  //   this.serverService.postWithToken("api/tests/createTest", data).subscribe(data => {
  //     console.log({ "data from db": data })

  //   })












  