import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/apiservice.service';
import { RouterLink, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService, public router: Router) { }

  ngOnInit(): void {
    
  }

  errorMsgEmpty:any
  errorMsgNoData:any

loginForm = new FormGroup({
'userName': new FormControl('', Validators.required),
'userPassword': new FormControl('',Validators.required)

});


loginSubmit()
{
  if(this.loginForm.valid)
  {
    console.log(this.loginForm.value)
    this.service.loginUser(this.loginForm.value).subscribe((res)=>{
      this.service.userId = res[0].Customer_ID;
      console.log(res)
      console.log(this.service.userId,'res=>');

      if(this.service.userLogged = true){
        this.router.navigate([`customer-dashboard/${res[0].Customer_ID}`])
      }
    });
  }
  else
  {
    this.errorMsgEmpty='All fields are required to Sign in';
  }


}

}
