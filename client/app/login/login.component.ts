import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  // @ts-ignore
  loading = false;
  // @ts-ignore
  submitted = false;
  // @ts-ignore
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    return this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // tslint:disable-next-line:typedef
  get f() { return this.loginForm.controls; }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.authService.login(this.f.username.value, this.f.password.value);
    // @ts-ignore
    // @ts-ignore
    this.router.navigate([this.returnUrl]);


    // tslint:disable-next-line:typedef
    // @ts-ignore
    console.log('submitted');
  }
}
