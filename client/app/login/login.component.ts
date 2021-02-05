import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor() { }
  public gapiSetup = false;
  authInstance: gapi.auth2.GoogleAuth;
  user: gapi.auth2.GoogleUser;
  error: string;
  returnUrl: string;
  private route: ActivatedRoute;
  private router: Router;

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

  // @ts-ignore
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

