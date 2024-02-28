import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ModelEntity } from './model.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ModelService {
  recordsChanged = new Subject<ModelEntity[]>();
  startedEditing = new Subject<number>();
  constructor(private apiService: ApiService) { }
  private recordsApi!: ModelEntity[]
  // private records: ModelEntity[] = [
  //   new ModelEntity(
  //       1,
  //       'model 1',
  //       true,
  //       true,
  //       'Model Desc 1',
  //       'Model 1 Search',
  //       'purchase 1',
  //       'contract 1'
  //     ),
  //     new ModelEntity(
  //       2,
  //       'model 2',
  //       true,
  //       true,
  //       'Model Desc 2',
  //       'Model 2 Search',
  //       'purchase 2',
  //       'contract 2'
  //       )];


  getRecords() {
   // console.log(this.records.slice());
    // return this.records.slice();
    this.apiService.get<ModelEntity[]>('modelspecs').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }

  // getRecord(index: number) {
  //   return this.records[index];
  // }
 

  addRecord(record: ModelEntity) {
    // this.records.push(record);
    // console.log(this.records);
    // this.recordsChanged.next(this.records.slice());
    this.apiService.post<ModelEntity>('modelspecs', record).subscribe((response: ModelEntity) => {
      console.log('modelspecs created:', response);
      this.getRecords();
      return response
      
    });
  }

  // addrecords(records: ModelEntity[]) {
  //   this.records.push(...records);
  //   this.recordsChanged.next(this.records.slice());
  // }
  updateRecord(index: number, newRecord: ModelEntity) {
    // this.records[index] = newRecord;
    // console.log(this.records)
    // this.recordsChanged.next(this.records.slice());
    this.apiService.put<ModelEntity>('modelspecs', index, newRecord).subscribe(response => {
      console.log('modelspecs updated:',response);
      this.getRecords()
    });
  }

  deleteRecord(index: number) {
    // this.records.splice(index, 1);
    // console.log(this.records);
    // this.recordsChanged.next(this.records.slice());
    // console.log(this.recordsChanged);
  }

}