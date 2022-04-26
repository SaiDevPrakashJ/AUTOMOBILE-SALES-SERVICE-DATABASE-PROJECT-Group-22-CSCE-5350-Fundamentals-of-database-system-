import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/apiservice.service';

@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})
export class DealerDashboardComponent implements OnInit {

  constructor(public service:ApiserviceService) { }
  counter(i: number) {
    return new Array(i);
}
load = true;
readData: any;
prodData: any;
response: any;
vehicleData: any;

  ngOnInit(): void {
    this.load = true;
    this.service.getDealerData().subscribe((res)=>{
      this.readData = res.data;
      console.log(this.readData);
      this.load = false;
    });

    this.service.getVehicleInfo().subscribe((res)=>{
      console.log(res)
      this.response = res
      this.vehicleData=this.response.data;
    });

    this.service.getAllTickets().subscribe((res)=>{
      this.response = res;
      this.prodData = this.response.data;
      console.log(this.prodData);
      this.load = false;
    });
    
  }

}
