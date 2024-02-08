import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ServiceType } from './service-type.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ServiceTypeService {
  recordsChanged = new Subject<ServiceType[]>();
  startedEditing = new Subject<number>();
  model!:'servicetypes';
  constructor(private apiService:ApiService ,private http: HttpClient) { }
  private recordsApi!: ServiceType[]

  getApiRecords(){
  //: Observable<Company[]> {
   //return this.apiService.get<Company[]>('companies');
  //  return this.apiService.get<Company[]>('companies');
    this.apiService.get<ServiceType[]>('servicetypes').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(company: ServiceType) {
    this.apiService.post<ServiceType>('servicetypes', company).subscribe((response: ServiceType) => {
      console.log('ServiceType created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<ServiceType>('servicetypes', company);
  }
  updateApiRecord(id:number,company: any) {
    console.log(this.apiService.put<ServiceType>('servicetypes',id, company));
   this.apiService.put<ServiceType>('servicetypes',id,company).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<ServiceType>('servicetypes',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<ServiceType>('servicetypes',id));
    this.apiService.delete<ServiceType>('servicetypes',id).subscribe(response =>{
      //console.log(response);
      this.getApiRecords();
    })
    
  }
}