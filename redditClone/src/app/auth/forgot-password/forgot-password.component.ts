import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private connect: AuthService) { }

  ngOnInit(): void {
  }

  email:String='';
  mailSent: boolean =false;
  msg: String;
  resetPass(){
    this.connect.forgotPass(this.email).subscribe(
      data =>{
        this.msg = data
      }
      ,err =>{
        this.msg = err.error.message;
      }
    )
    this.mailSent = true;
  }

}
