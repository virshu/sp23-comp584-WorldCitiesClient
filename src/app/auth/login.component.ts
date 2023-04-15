import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  loginResult!: LoginResult;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    var loginRequest = <LoginRequest>{
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    };
    this.authService.login(loginRequest).subscribe({
      next: result => {
        console.log(result);
        this.loginResult = result;
        if (result.success) {
          localStorage.setItem(this.authService.tokenKey, result.token);
          this.router.navigate(["/"]);
        }
      },
      error: error => {
        console.log(error);
        if (error.status == 401) {
          loginRequest = error.error;
        }
    }});
  }

}
