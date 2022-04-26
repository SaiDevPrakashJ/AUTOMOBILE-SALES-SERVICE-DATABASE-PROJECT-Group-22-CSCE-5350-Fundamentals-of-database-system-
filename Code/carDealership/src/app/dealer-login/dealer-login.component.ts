import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-dealer-login',
  templateUrl: './dealer-login.component.html',
  styleUrls: ['./dealer-login.component.css']
})
export class DealerLoginComponent implements OnInit {

  constructor(public service:ApiserviceService, public router: Router) { }

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
    this.service.dealerLoginUser(this.loginForm.value).subscribe((res)=>{
      this.service.userId = res[0].Dealer_Code;
      console.log(this.service.userId,'res=>');
      console.log(res)

      if(this.service.dealerLogged = true){
        this.router.navigate([`dealer-dashboard/${res[0].Dealer_Code}`])
      }
      // if(res == 404){
      //   this.errorMsgNoData ='User data not found, try again';
      // }
    });
  }
  else
  {
    this.errorMsgEmpty='All fields are required to Sign in';
  }


}

}
