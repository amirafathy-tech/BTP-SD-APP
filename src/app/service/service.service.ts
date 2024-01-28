import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Service } from './service.model';

@Injectable()
export class ServiceDetailService {
  recordsChanged = new Subject<Service[]>();
  startedEditing = new Subject<number>();

  private records: Service[] = [
    new Service(
        1,
        true,
        1,
        true,
        'service 1',
        1,
        1000,
        1,
        true,
        true,
        1,
        'service 1 external',
        10000,
        'service1 text', 
        'line1 text',
        'formula1 text',
        'lin1 text',
        'alt1 text',
        true,
        true,
        true
      ),
      new Service(
        2,
        true,
        1,
        true,
        'service 1',
        1,
        1000,
        1,
        true,
        true,
        1,
        'service 1 external',
        10000,
        'service1 text', 
        'line1 text',
        'formula1 text',
        'lin1 text',
        'alt1 text',
        true,
        true,
        true
        )];


  getRecords() {
   // console.log(this.records.slice());
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(record: Service) {
    this.records.push(record);
    //console.log(this.records);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: Service[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newProject: Service) {
    this.records[index] = newProject;
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