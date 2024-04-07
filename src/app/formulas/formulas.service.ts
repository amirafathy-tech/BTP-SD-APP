import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Formula } from './formulas.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../ApiService.service';

@Injectable()
export class FormulasService {
  recordsChanged = new Subject<Formula[]>();
  startedEditing = new Subject<number>();
  model!:'formulas';
  constructor(private apiService:ApiService ,private http: HttpClient) { }
  private recordsApi!: Formula[]

  getApiRecords(){
    this.apiService.get<Formula[]>('formulas').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  // addApiRecord(record: Formula) {
  //   this.apiService.post<Formula>('formulas', record).subscribe((response: Formula) => {
  //     console.log('Formula created:', response);
  //     this.getApiRecords();
  //   });
    
  //   return this.apiService.post<Formula>('formulas', record);
  // }
  // updateApiRecord(id:number,record: any) {
  //   console.log(this.apiService.put<Formula>('formulas',id, record));
  //  this.apiService.put<Formula>('formulas',id,record).subscribe(response => {
  //   console.log(response);
  //  this.getApiRecords()
  // });
  // }
  // getApiRecord(index:number) {
  //  return this.apiService.getID<Formula>('formulas',index)
  // }
  // deleteApiRecord(id:number) {
  //   console.log(this.apiService.delete<Formula>('formulas',id));
  //   this.apiService.delete<Formula>('formulas',id).subscribe(response =>{
  //     console.log(response);
  //     this.getApiRecords();
  //   })
    
  // }

  // updateRecord(index: number, newRecord: Formula) {
  //   // this.records[index] = newRecord;
  //   // console.log(this.records)
  //   // this.recordsChanged.next(this.records.slice());
  //   this.apiService.put<Formula>('formulas', index, newRecord).subscribe(response => {
  //     console.log('formula updated:',response);
  //     this.getApiRecords()
  //   });
  // }
}