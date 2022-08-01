import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  internResult= null
  allUsers=[];
  allTests = [];
  correntResultIndex=null;
  currentTestIndex = null; 
  currentAnswerTestIndex=null;
  
  
  constructor() { }
}
