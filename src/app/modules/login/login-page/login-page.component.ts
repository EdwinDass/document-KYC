import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
console.log("hidbhcbahbsvbs")
      this.myusername = this.form.get('email')?.value;
      this.mypassword = this.form.get('password')?.value;

      if(this.myusername=="edwin@gmail.com" && this.mypassword=="Test$123" ){
        this.router.navigate(["home"]);
      }else{
        this.router.navigate(["/login"]);
      }

    }

}

