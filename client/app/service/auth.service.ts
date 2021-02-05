import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, observable} from 'rxjs';
import {User} from '../models/user';
import {Router, RouterModule, ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private currentSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // @ts-ignore

  }
  public gapiSetup = false;
  authInstance: gapi.auth2.GoogleAuth;
  user: gapi.auth2.GoogleUser;
  error: string;
  returnUrl: string;
  private route: ActivatedRoute;
  private router: Router;
  // tslint:disable-next-line:typedef

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
    // return this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }
  async initGoogleAuth(): Promise <void>{
    const pload = new Promise((resolve => gapi.load('auth2', resolve)));

    return pload.then(async () => {
      await gapi.auth2.init({client_id:'dummy_client_id'})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }
  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return new Promise(async () => {
      // @ts-ignore
      await this.authInstance.signIn().then((user, error) => {
          if (user){
            // localStorage.setItem('currentUser', user.access_token);
            // this.router.navigate(['']);
          } else {
            return new Error(error);
          }
        }
      );
    });
  }
  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }
  async logOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
