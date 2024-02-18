import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ServiceMasterService } from '../service-master.service';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/ApiService.service';
import { ServiceMaster } from '../service-master.model';
import { Instant } from 'js-joda';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-master-add',
  templateUrl: './service-master-add.component.html',
  styleUrls: ['./service-master-add.component.css'],
  providers: [ApiService, ServiceMasterService, MessageService]
})
export class ServiceMasterAddComponent implements OnInit {

  editMode = false
  selectedRecord: ServiceMaster = {
    id: 0, code: '', description: '', shortTextChangeAllowed: false, deletionIndicator: false,
    numberToBeConverted: 0, convertedNumber: 0, mainItem: false,
    lastChangeDate: Instant.now()
  };

  messageAdd!: Message[];
  addMessage: boolean = false;
  messageUpdate!: Message[];
  updateMessage: boolean = false;
  
  @ViewChild('f', { static: false })
  slForm!: NgForm

  // Fields of Dropdowns:
  recordsServiceType!: any[];
  recordsFormula!: any[];
  selectedServiceType: string | undefined;

  ngOnInit() {
    // this.apiService.get<any[]>('formulas').subscribe(response => {
    //   console.log(response);
    //   this.recordsFormula = response;
    //   console.log(this.recordsFormula);

    // });
    // this.apiService.get<any[]>('servicetypes').subscribe(response => {
    //   console.log(response);
    //   this.recordsServiceType = response;
    //   console.log(this.recordsServiceType);
    // });
   this.messageAdd = [{ severity: 'success', summary: 'Success', detail: 'Added Successfully' }];
   this.messageUpdate = [{ severity: 'success', summary: 'Success', detail: 'Updated Successfully' }];
  }

  constructor(private apiService: ApiService, private serviceMasterService: ServiceMasterService
    , private messageService: MessageService, private router: Router, private route: ActivatedRoute) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state?.['Record'];
      const copyFlag = this.router.getCurrentNavigation()?.extras.state?.['Copy'];
      console.log(state);
      console.log(copyFlag);
      if (copyFlag) {
        this.selectedRecord = state;
        console.log(this.selectedRecord);
        //this.editMode = true;
        console.log(this.editMode);
      }else{
        this.selectedRecord = state;
        this.editMode = true;
        console.log(this.selectedRecord);
      }
    }
  }


  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new ServiceMaster(value.id, value.code, value.description, value.shortTextChangeAllowed,
      value.deletionIndicator
      , value.mainItem, value.numberToBeConverted,
      value.convertedNumber, Instant.now());
    console.log(newRecord);
    if (this.editMode) {
      const updatedRecord = {
        id: this.selectedRecord.id, code: value.code, description: value.description
        , shortTextChangeAllowed: value.shortTextChangeAllowed, deletionIndicator: value.deletionIndicator,
        mainItem: value.mainItem, numberToBeConverted: value.numberToBeConverted,
        convertedNumber: value.convertedNumber, lastChangeDate: Instant.now()
      };
      console.log(updatedRecord);

      this.serviceMasterService.updateRecord(this.selectedRecord.id, updatedRecord);
      this.updateMessage = true;
    } else {
      this.serviceMasterService.addRecord(newRecord);
      this.addMessage = true;
    }
    //this.editMode = false;
    // this.serviceMasterService.addRecord(newRecord);
    //  this.addMessage = true;
  }
}
