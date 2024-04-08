import { Component, ViewChild } from '@angular/core';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './service-type.model';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../ApiService.service';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css'],
  providers: [ServiceTypeService, MessageService, ConfirmationService]
})
export class ServiceTypeComponent {
  records!: ServiceType[];
  private subscription!: Subscription;
  constructor(private apiService: ApiService, private serviceTypeService: ServiceTypeService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
 
  ngOnInit() {
    console.log(this.serviceTypeService.getApiRecords());
    this.serviceTypeService.getApiRecords();
    this.subscription = this.serviceTypeService.recordsChanged.subscribe((records: ServiceType[]) => {
     // this.records = records;
     
    // Sort the records based on lastChangeDate
   // this.records = records.sort((a, b) => new Date(b.lastChangeDate).getTime() - new Date(a.lastChangeDate).getTime());
   this.records = records.sort((a, b) => b.serviceTypeCode - a.serviceTypeCode);
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.serviceTypeService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  editMode = false;
  clonedRecords: { [s: number]: ServiceType; } = {};

  onRowEditInit(record: ServiceType) {
    this.clonedRecords[record.serviceTypeCode] = { ...record };
  }

  onRowEditSave(index: number, record: ServiceType) {
    console.log(index);
    console.log(record);

    this.serviceTypeService.updateRecord(index, record);
    this.ngOnInit(); //reload the table
    this.editMode = false;
    delete this.clonedRecords[record.serviceTypeCode];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record is updated' });

  }

  onRowEditCancel(record: ServiceType, index: number) {
    this.records[index] = this.clonedRecords[record.serviceTypeCode];
    delete this.clonedRecords[record.serviceTypeCode];
  }

  deleteRecord(record: ServiceType) {
    // const index = this.records.indexOf(record);
    // if (index !== -1) {
    //   this.records.splice(index, 1);
    // }
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // for (const record of this.selectedAllRecords) {
        this.apiService.delete<ServiceType>('servicetypes', record.serviceTypeCode).subscribe(response => {
          console.log('service type deleted:', response);
          this.serviceTypeService.getApiRecords();
        });
        // }
        this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Deleted', life: 3000 });
        //this.selectedAllRecords = [];
      }
    });
  }

  newServiceType: ServiceType = {
    serviceTypeCode: 0,
    serviceId: '',
    description: '',
    lastChangeDate: new Date(),
  }
  addRow() {
    console.log(this.newServiceType);
    const newRecord = {
      serviceId: this.newServiceType.serviceId,
      description: this.newServiceType.description
    }
    console.log(newRecord);
    const filteredRecord = Object.fromEntries(
      Object.entries(newRecord).filter(([_, value]) => {
        return value !== '' && value !== undefined;
      })
    );
    console.log(filteredRecord);
    this.apiService.post<ServiceType>('servicetypes', filteredRecord).subscribe((response: ServiceType) => {
      console.log('ServiceType created:', response);
      if (response) {
        this.resetNewService();
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ServiceType added Successfully' });
        console.log(this.newServiceType);

      }
      this.ngOnInit()
    })

  }
  resetNewService() {
    this.newServiceType = {
      serviceTypeCode: 0,
      serviceId: '',
      description: '',
      lastChangeDate: new Date(),
    };
  }
}
