import { Component, ViewChild } from '@angular/core';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './service-type.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css'],
  providers:[ServiceTypeService]
})
export class ServiceTypeComponent {

  // records!: ServiceType[];
  records!: ServiceType[];
  private subscription!: Subscription;
  constructor(private serviceTypeService: ServiceTypeService) { }
 //response:Observable<Company[]>;
  ngOnInit() {
  //this.records=this.companyService.getApiRecords();
    console.log(this.serviceTypeService.getApiRecords());
   this.serviceTypeService.getApiRecords();
   this.subscription =this.serviceTypeService.recordsChanged.subscribe((records: ServiceType[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.serviceTypeService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
