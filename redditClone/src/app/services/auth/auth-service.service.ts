import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = 'http://localhost:7503/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.controls['username'].value,
      password: credentials.controls['password'].value
    }, httpOptions);
  }

  register(user: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstName: user.controls['firstName'].value,
      lastName: user.controls['lastName'].value,
      mobile: user.controls['mobile'].value,
      username: user.controls['username'].value,
      email: user.controls['email'].value,
      password: user.controls['password'].value,
    }, httpOptions);
  }

  forgotPass(email: String):Observable<any>{
    return this.http.get(AUTH_API+"user/resetPassword/"+email, httpOptions);
  }

}
