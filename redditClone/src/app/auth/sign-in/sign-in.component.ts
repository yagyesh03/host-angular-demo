import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TokenStorageService } from 'src/app/services/tokenStorageService/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  submitted= false;
  showError: boolean;
  registerSuccessMessage: string;

  constructor( 
                private fb: FormBuilder,
                private authService: AuthService, 
                private route: Router, 
                private tokenStorage: TokenStorageService,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  onSubmit() {
    this.submitted = true
    this.authService.login(this.signInForm).subscribe(
      data => {          
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.route.navigateByUrl('/home');
          this.toastr.success('Login Successful');          
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    );
  }

  logout(){
    this.tokenStorage.signOut();
    this.route.navigateByUrl("/")
  }
  reloadPage() {
    window.location.reload();
  }

  get f() { return this.signInForm.controls; }

}
