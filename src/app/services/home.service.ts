import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { personModel } from '../components/models/person.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  name:any;
  // private person: BehaviorSubject<personModel[]>;

  private _person = {};
  
  constructor(private serverService: ServerService) {
    // this.person = new BehaviorSubject<personModel[]>(this._person);
  }


  getUser() {
    return this._person;
  }

  setUser(data: any): void {
    this._person = data;
  }

  createUser(a: personModel) {
    return this.serverService.registerUser(a);
  }

  // set_name(name:personModel){
  //   this.name=name
  // }



}


