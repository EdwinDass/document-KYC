import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginEmailerror = false;
  customControl = FormControl;
  loginPwderror = false;
  form!: FormGroup;
  pwdVisible = false;
  myusername: string = "";
  mypassword: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice:ApiService,
    private authService: AuthService,
  ) {

    // this.form = this.fb.group({ username: '',password:'' });
  }
    ngOnInit(): void {

      this.form = this.fb.group({
        email: ["", [Validators.pattern, Validators.required]],
        password: ["", [Validators.pattern, Validators.required]],
      });
    }
    onSubmit(){
      if(this.form.valid){
        this.apiservice.AdminLogin(this.form.value).subscribe((response:any)=>{
          // console.log(response)
          // sessionStorage.setItem('login', JSON.stringify(response));
          if(response.status==true) if (
            (response.user.user_role == "xuritiAdmin")
            || (response.user.user_role == "xuritiStaff")
            || (response.user.user_role == "xuritiCreditMgr")
            || (response.user.user_role == "xuritiCollectionMgr")
            || (response.user.user_role == "xuritiCollectionStaff")) {              
            sessionStorage.setItem("LoginId", response.user._id);
            sessionStorage.setItem("Role", response.user.user_role);
            sessionStorage.setItem('Token',response.token)
            this.authService.setAuthStatus(response);
            this.router.navigate(["/home"]);
          }
        })
      }

    }

}

