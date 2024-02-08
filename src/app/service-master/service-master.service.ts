import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ServiceMaster } from './service-master.model';
import { Instant } from 'js-joda';

@Injectable()
export class ServiceMasterService {
  recordsChanged = new Subject<ServiceMaster[]>();
  startedEditing = new Subject<number>();

  private records: ServiceMaster[] = [
    new ServiceMaster(
      1,
        "s1 code",
        'service master 1',
        true,
        true,
        true,
        5,
        55,
        Instant.now()

      ),
      new ServiceMaster(
        2,
        "s2",
        'service master 2',
        true,
        true,
        true,
        5,
        55,
        Instant.now()
        )];


  getRecords() {
   // console.log(this.records.slice());
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(record: ServiceMaster) {
    this.records.push(record);
    console.log(this.records);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: ServiceMaster[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newRecord: ServiceMaster) {
    this.records[index] = newRecord;
    console.log(this.records)
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    console.log(this.records);
    this.recordsChanged.next(this.records.slice());
    console.log(this.recordsChanged);
  }

}