import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/apiservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  load = true;

  constructor(public service:ApiserviceService, public activatedRoute: ActivatedRoute) {
  }

  counter(i: number) {
    return new Array(i);
}

readData: any;
vehicleData: any;
response: any;

  ngOnInit(): void {
    this.load = true;
    this.service.getCustomerData().subscribe((res)=>{
      this.readData = res.data;
      console.log(this.readData);
      this.load = false;
    });

    this.service.getVehicleInfo().subscribe((res)=>{
      console.log(res)
      this.response = res
      this.vehicleData=this.response.data;
    })
  }

}
