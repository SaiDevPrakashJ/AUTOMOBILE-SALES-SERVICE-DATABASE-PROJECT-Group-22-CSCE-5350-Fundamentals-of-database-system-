import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service:ApiserviceService, public router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.dealerLogged = false;
    this.service.userLogged = false;
    this.router.navigate(['/']);
  }
  goToService(){
    this.router.navigate([`/customer-service/${this.service.userId}`])

  }
}
