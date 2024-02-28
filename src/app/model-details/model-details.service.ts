import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ModelSpecDetails } from './model-details.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ModelSpecDetailService {
  recordsChanged = new Subject<ModelSpecDetails[]>();
  startedEditing = new Subject<number>();
  constructor(private apiService: ApiService) { }
  private recordsApi!: ModelSpecDetails[]
  // private records: ModelSpecDetails[] = [
  //   new ModelSpecDetails(
  //       1,
  //       true,
  //       1,
  //       true,
  //       'service 1',
  //       1,
  //       1000,
  //       1,
  //       true,
  //       true,
  //       1,
  //       'service 1 external',
  //       10000,
  //       'service1 text', 
  //       'line1 text',
  //       'formula1 text',
  //       'lin1 text',
  //       'alt1 text',
  //       true,
  //       true,
  //       true
  //     ),
  //     new ModelSpecDetails(
  //       2,
  //       true,
  //       1,
  //       true,
  //       'service 1',
  //       1,
  //       1000,
  //       1,
  //       true,
  //       true,
  //       1,
  //       'service 1 external',
  //       10000,
  //       'service1 text', 
  //       'line1 text',
  //       'formula1 text',
  //       'lin1 text',
  //       'alt1 text',
  //       true,
  //       true,
  //       true
  //       )];


  getRecords() {
   // console.log(this.records.slice());
    // return this.records.slice();
    this.apiService.get<ModelSpecDetails[]>('modelspecdetails').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }

  getRecord(index: number) {
    // return this.records[index];
  }
 

  addRecord(record: ModelSpecDetails) {
    // this.records.push(record);
    // //console.log(this.records);
    // this.recordsChanged.next(this.records.slice());
    this.apiService.post<ModelSpecDetails>('modelspecdetails', record).subscribe((response: ModelSpecDetails) => {
      console.log('modelspecDetail created:', response);
      this.getRecords();
      return response
      
    });
  }

  // addrecords(records: ModelSpecDetails[]) {
  //   this.records.push(...records);
  //   this.recordsChanged.next(this.records.slice());
  // }
  updateRecord(index: number, newRecord: ModelSpecDetails) {
    // this.records[index] = newProject;
    // console.log(this.records)
    // this.recordsChanged.next(this.records.slice());
    this.apiService.put<ModelSpecDetails>('modelspecdetails', index, newRecord).subscribe(response => {
      console.log('modelspecDetail updated:',response);
      this.getRecords()
    });
  }

  deleteRecord(index: any) {
    // this.records.splice(index, 1);
    // console.log(this.records);
    // this.recordsChanged.next(this.records.slice());
    // console.log(this.recordsChanged);
    this.apiService.delete<ModelSpecDetails>('modelspecdetails', index).subscribe(response => {
      console.log('model spec deleted:',response);
      this.getRecords()
    });
  }



}