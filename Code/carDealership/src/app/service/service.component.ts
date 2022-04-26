import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/apiservice.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(public service:ApiserviceService) { }
  counter(i: number) {
    return new Array(i);
}

load = true;
readData : any;
response: any;
noTickets = false;

ngOnInit(): void {
  this.load = true;
  this.service.getCustomerTickets().subscribe((res)=>{
    this.response = res;
    this.readData = this.response.data;
    console.log(this.readData);
    if(this.readData.length == 0){
      this.noTickets = true;
    }
    this.load = false;
  });
}

}
