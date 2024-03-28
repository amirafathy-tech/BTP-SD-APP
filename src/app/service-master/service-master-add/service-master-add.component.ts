import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
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
  providers: [ApiService, ServiceMasterService, MessageService, ConfirmationService]
})
export class ServiceMasterAddComponent implements OnInit {
savedRecord!:ServiceMaster;
public isSaving: boolean = false;

  editMode = false
  selectedRecord: ServiceMaster = {
    serviceNumberCode: 0, searchTerm: '', description: '',serviceText:'', shortTextChangeAllowed: false, deletionIndicator: false,
    numberToBeConverted: 0, convertedNumber: 0, mainItem: false,
    formulaCode:0,
    //unitOfMeasurementCode:0,
    serviceTypeCode:0,materialGroupCode:0,
    lastChangeDate: Instant.now(),baseUnitOfMeasurement:'',toBeConvertedUnitOfMeasurement:'',defaultUnitOfMeasurement:''
  };

  messageAdd!: Message[];
  addMessage: boolean = false;
  messageUpdate!: Message[];
  updateMessage: boolean = false;
  
  @ViewChild('f', { static: false })
  slForm!: NgForm

  // Fields of Dropdowns:
  recordsServiceType!: any[];
  selectedServiceType!: number;
  recordsMeasure!: any[];

  selectedBaseMeasure!: number;

  baseUnitOfMeasurement!:string;
  selectedToBeConvertedMeasure!: string;
  selectedConvertedMeasure!: string;

  recordsFormula!: any[];
  selectedFormula!: number;
  recordsMaterialGrp!: any[];
  selectedMaterialGrp!: number;
  

  ngOnInit() {
    this.apiService.get<any[]>('formulas').subscribe(response => {
      console.log(response);
      this.recordsFormula = response;
      console.log(this.recordsFormula);

    });
    this.apiService.get<any[]>('servicetypes').subscribe(response => {
      console.log(response);
      this.recordsServiceType = response;
      console.log(this.recordsServiceType);
    });
    this.apiService.get<any[]>('measurements').subscribe(response => {
      console.log(response);
      this.recordsMeasure = response;
      console.log(this.recordsMeasure);
    });
    this.apiService.get<any[]>('materialgroups').subscribe(response => {
      console.log(response);
      this.recordsMaterialGrp = response;
      console.log(this.recordsMaterialGrp);
    });

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

  // onBaseMeasureSelection(event: any) {
  //   const selectedRecord = this.recordsMeasure.find(record => record.unitOfMeasurementCode === this.selectedBaseMeasure);
  //   console.log(selectedRecord);

  //   if (selectedRecord) {
  //     this.baseUnitOfMeasurement = selectedRecord.code
  //   }
  //   else {
  //     console.log("no UnitOfMeasurement");
  //     this.baseUnitOfMeasurement='';
  //   }
  // }
  
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(this.selectedServiceType);
    
    const newRecord = new ServiceMaster(value.searchTerm, value.description,value.serviceText, value.shortTextChangeAllowed,
      value.deletionIndicator
      , value.mainItem, value.numberToBeConverted,
      value.convertedNumber,
      //this.selectedFormula,
      this.selectedRecord.formulaCode,
      //this.selectedBaseMeasure,
      // this.selectedServiceType,this.selectedMaterialGrp,
      this.selectedRecord.serviceTypeCode,this.selectedRecord.materialGroupCode,
       Instant.now(),
       //this.baseUnitOfMeasurement,this.selectedToBeConvertedMeasure,this.selectedConvertedMeasure
      this.selectedRecord.baseUnitOfMeasurement,this.selectedRecord.toBeConvertedUnitOfMeasurement,this.selectedRecord.defaultUnitOfMeasurement);

    console.log(newRecord);
    if (this.editMode) {
      const updatedRecord = {
        serviceNumberCode: this.selectedRecord.serviceNumberCode, searchTerm: value.searchTerm, description: value.description
        ,serviceText:value.serviceText, shortTextChangeAllowed: value.shortTextChangeAllowed, deletionIndicator: value.deletionIndicator,
        mainItem: value.mainItem, numberToBeConverted: value.numberToBeConverted,
        convertedNumber: value.convertedNumber,
        formulaCode:this.selectedRecord.formulaCode,
        serviceTypeCode:this.selectedRecord.serviceTypeCode,
        materialGroupCode:this.selectedRecord.materialGroupCode,
      //   formulaCode: this.selectedFormula,
      //  // unitOfMeasurementCode: this.selectedBaseMeasure,
      //   serviceTypeCode: this.selectedServiceType,
      //   materialGroupCode:this.selectedMaterialGrp,
        lastChangeDate: Instant.now(),
        baseUnitOfMeasurement:this.selectedRecord.baseUnitOfMeasurement,
        toBeConvertedUnitOfMeasurement:this.selectedRecord.toBeConvertedUnitOfMeasurement,
        defaultUnitOfMeasurement:this.selectedRecord.defaultUnitOfMeasurement
        // baseUnitOfMeasurement:this.baseUnitOfMeasurement,
        // toBeConvertedUnitOfMeasurement:this.selectedToBeConvertedMeasure,
        // defaultUnitOfMeasurement:this.selectedConvertedMeasure
      };
      console.log(updatedRecord);

      this.serviceMasterService.updateRecord(this.selectedRecord.serviceNumberCode, updatedRecord);
      this.updateMessage = true;
    } else {
      //this.serviceMasterService.addRecord(newRecord);
     // this.savedRecord=this.serviceMasterService.addRecord(newRecord);
     this.apiService.post<ServiceMaster>('servicenumbers', newRecord).subscribe((response: ServiceMaster) => {
      console.log('service master created:', response);
      this.isSaving = true;
      this.serviceMasterService.getRecords();
      this.savedRecord= response
      console.log(this.savedRecord);
      
      
    });
      this.addMessage = true;
    }
    //this.editMode = false;
    // this.serviceMasterService.addRecord(newRecord);
    //  this.addMessage = true;
  }
}
