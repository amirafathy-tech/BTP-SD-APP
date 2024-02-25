import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ServiceMaster } from './service-master.model';
import { Instant } from 'js-joda';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ServiceMasterService {
  recordsChanged = new Subject<ServiceMaster[]>();
  startedEditing = new Subject<number>();
  constructor(private apiService: ApiService) { }
  private recordsApi!: ServiceMaster[]

  // private records: ServiceMaster[] = [
  //   new ServiceMaster(
  //   // 1,
  //       "s1 code",
  //       'service master 1',
  //       'service text 1',
  //       true,
  //       true,
  //       true,
  //       5,
  //       55,
  //       1,
  //       2,
  //       3,
  //       4,
  //       Instant.now()

  //     ),
  //     new ServiceMaster(
  //      // 2,
  //       "s2",
  //       'service master 2',
  //       'service text 2',
  //       true,
  //       true,
  //       true,
  //       5,
  //       55,
  //       1,
  //       2,
  //       3,
  //       4,
  //       Instant.now()
  //       )];


  getRecords() {
   // console.log(this.records.slice());
    // return this.records.slice();
    this.apiService.get<ServiceMaster[]>('servicenumbers').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });

  }

  // getRecord(index: number) {
  //   return this.records[index];
  // }
 

  addRecord(record: ServiceMaster) {
    // this.records.push(record);
    // console.log(this.records);
    // this.recordsChanged.next(this.records.slice());
    this.apiService.post<ServiceMaster>('servicenumbers', record).subscribe((response: ServiceMaster) => {
      console.log('service master created:', response);
      this.getRecords();
      return response
      
    });

  }

  // addrecords(records: ServiceMaster[]) {
  //   this.records.push(...records);
  //   this.recordsChanged.next(this.records.slice());
  // }
  updateRecord(index: number, newRecord: ServiceMaster) {
    // this.records[index] = newRecord;
    // console.log(this.records)
    // this.recordsChanged.next(this.records.slice());
    //console.log(this.apiService.put<ServiceMaster>(`servicenumbers`, index, newRecord));
    this.apiService.put<ServiceMaster>('servicenumbers', index, newRecord).subscribe(response => {
      console.log('service master updated:',response);
      this.getRecords()
    });

  }

  // deleteRecord(index: number) {
  //   this.records.splice(index, 1);
  //   console.log(this.records);
  //   this.recordsChanged.next(this.records.slice());
  //   console.log(this.recordsChanged);
  // }

}