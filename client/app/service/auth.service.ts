import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentSubject.asObservable();
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  login(username, password){
    if (username === 'sajak' && password === 'sajak123') {

      localStorage.setItem('currentUser', JSON.stringify({username: 'sajak', password: 'sajak123'}));
      this.currentSubject.next({username: 'sajak', password: 'sajak123'});
      return JSON.parse(JSON.stringify({username: 'sajak', password: 'sajak123'}));
    } else{
      return {
        success: 0,
        msg: 'Invalid User'
      };
    }
  }
  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentSubject.next(null);
  }

  public get currentUserValue(): User {
    // @ts-ignore
    return this.currentSubject.value;
  }
}
