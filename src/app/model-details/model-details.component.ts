import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModelSpecDetailService } from './model-details.service';
import { ModelSpecDetails } from './model-details.model';
import { ModelEntity } from '../model/model.model';
import { Router } from '@angular/router';
import { ApiService } from '../ApiService.service';
import { Subscription } from 'rxjs';
import { ServiceMaster } from '../service-master/service-master.model';
import { ServiceType } from '../service-type/service-type.model';
import { UnitOfMeasure } from '../models/unitOfMeasure.model';
import { NgForm } from '@angular/forms';
import { PersonnelNumber } from '../models/personnelNumber.model';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
  providers: [ModelSpecDetailService, MessageService,ConfirmationService]
})
export class ModelDetailsComponent {

  subscription!: Subscription;
  records!: ModelSpecDetails[];
  recordsLength!: number

  modelSpecRecord!: ModelEntity // hold ModelSpecRecord from previous screen
  currency: any
 
  //fields for dropdown lists
  recordsServiceNumber!: ServiceMaster[];
  selectedServiceNumber!: number;
  selectedServiceNumberRecord!: ServiceMaster
  shortText: string = '';
  shortTextChangeAllowed: boolean = false;

  recordsUnitOfMeasure!: UnitOfMeasure[];
  selectedUnitOfMeasure!: number;

  recordsServiceType!: ServiceType[];
  selectedServiceType!: number;

  recordsPersonnelNumber!: PersonnelNumber[];
  selectedPersonnelNumber!: number;

  recordsLineType!: any[];
  selectedLineType!: number;


  selectedModelSpecs!: ModelSpecDetails[] | null;
 

  constructor(private apiService: ApiService, private router: Router, private modelSpecDetailsService: ModelSpecDetailService, private messageService: MessageService, private confirmationService: ConfirmationService,) {
    this.modelSpecRecord = this.router.getCurrentNavigation()?.extras.state?.['Record'];

    console.log(this.modelSpecRecord);
    if (this.modelSpecRecord) {
      this.apiService.getID<any>('currencies', this.modelSpecRecord.currencyCode).subscribe(response => {
        this.currency = response
        console.log(this.currency);
      });
    }
  }
// to handle shortTextChangeAlolled Flag 
  onServiceNumberChange(event: any) {
    const selectedRecord = this.recordsServiceNumber.find(record => record.serviceNumberCode === this.selectedServiceNumber);
    console.log(selectedRecord);

    if (selectedRecord) {
      this.selectedServiceNumberRecord = selectedRecord
    }
    //this.selectedServiceNumberRecord = selectedRecord ? selectedRecord: {} ;
    this.shortTextChangeAllowed = this.selectedServiceNumberRecord?.shortTextChangeAllowed || false;
    console.log(this.shortTextChangeAllowed);

    this.shortText = ""
    console.log(this.selectedServiceNumberRecord);

  }
// to handle selection checkbox
  selectedRecord: ModelSpecDetails | null = null;
  selectedRecords: ModelSpecDetails[] = [];
  onRecordSelectionChange(event: any, record: any) {
    if (event.checked) {
      console.log(record);
      this.selectedRecord = record
      // Add the record to the selectedRecords array if it's not already present
      if (!this.selectedRecords.includes(record)) {
        this.selectedRecords.push(record);
        console.log(this.selectedRecords);
      }
    } else {
      // Remove the record from the selectedRecords array
      const index = this.selectedRecords.indexOf(record);
      console.log(index)
      if (index !== -1) {
        this.selectedRecords.splice(index, 1);
        console.log(this.selectedRecords);
      }
    }
  }

  onSelectAllRecords(event: any): void {
    if (event.checked) {    
      this.selectedRecords = [...this.records];
      console.log(this.selectedRecords);
    } else {
      // Deselect all records
      this.selectedRecords = [];
    }
  }
  
  ngOnInit() {
    this.modelSpecDetailsService.getRecords();
    this.subscription = this.modelSpecDetailsService.recordsChanged.subscribe((records: ModelSpecDetails[]) => {
      this.records = records;
      this.recordsLength = records.length;
      console.log(this.recordsLength);

      console.log(this.records);
    });

    this.apiService.get<ServiceMaster[]>('servicenumbers').subscribe(response => {
      console.log(response);
      this.recordsServiceNumber = response;
      console.log(this.recordsServiceNumber);
    });
    this.apiService.get<UnitOfMeasure[]>('measurements').subscribe(response => {
      console.log(response);
      this.recordsUnitOfMeasure = response;
      console.log(this.recordsUnitOfMeasure);
    });
    this.apiService.get<ServiceType[]>('servicetypes').subscribe(response => {
      console.log(response);
      this.recordsServiceType = response;
      console.log(this.recordsServiceType);
    });
    this.apiService.get<PersonnelNumber[]>('personnelnumbers').subscribe(response => {
      console.log(response);
      this.recordsPersonnelNumber = response;
      console.log(this.recordsPersonnelNumber);
    });
    this.apiService.get<any[]>('linetypes').subscribe(response => {
      console.log(response);
      this.recordsLineType = response;
      console.log(this.recordsLineType);
    });

  }
  
  deleteRecord(){
    console.log(this.selectedRecord);
    //this.modelSpecCode=  this.selectedRecord?.modelSpecDetailsCode
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.modelSpecDetailsService.deleteRecord(this.selectedRecord?.modelSpecDetailsCode)
          // this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
          if(this.selectedRecords.length === 1) {
            this.apiService.delete<ModelSpecDetails>('modelspecdetails', this.selectedRecord?.modelSpecDetailsCode).subscribe(response => {
              console.log('model spec deleted:',response);
              this.modelSpecDetailsService.getRecords();
              this.selectedRecords = [];
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Record Deleted', life: 3000 });
            });
          }
          else if (this.selectedRecords.length > 1) {
            for (const record of this.selectedRecords) {
              this.apiService.delete<ModelSpecDetails>('modelspecdetails', record.modelSpecDetailsCode).subscribe(response => {
                console.log('model spec deleted:', response);
                this.modelSpecDetailsService.getRecords();
              });
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Records Deleted', life: 3000 });
            this.selectedRecords = []; // Clear the selectedRecords array after deleting all records
          }
      }
  });
  }
  deleteSelectedRecords() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected records?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
            // this.selectedProducts = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Records Deleted', life: 3000 });
        }
    });
}

  onRowEditInit(product: ModelSpecDetails) {
    // this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(index: number, product: ModelSpecDetails) {
    this.records[index] = product;
    console.log(this.records)
    //this.recordsChanged.next(this.records.slice());
    // this.detailsService.updateRecord(index,product);
    this.ngOnInit(); //reload the table
    // if (product.price > 0) {
    //     delete this.clonedProducts[product.id as string];
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // } else {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
  }

  onRowEditCancel(product: ModelSpecDetails, index: number) {
    // this.products[index] = this.clonedProducts[product.id as string];
    // delete this.clonedProducts[product.id as string];
  }

  newService: ModelSpecDetails = {
    serviceNumberCode: 0,
    lineTypeCode: 0,
    unitOfMeasurementCode: 0,
    currencyCode: 0,
    personnelNumberCode: 0,
    serviceTypeCode: 0,
    materialGroupCode: 0,
    formulaCode: 0,
    selectionCheckbox: false,
    lineIndex: 0,
    deletionIndicator: false,
    shortText: '',
    quantity: 0,
    grossPrice: 0,
    overFulfilmentPercentage: 0,
    priceChangedAllowed: false,
    unlimitedOverFulfillment: false,
    pricePerUnitOfMeasurement: 0,
    externalServiceNumber: '',
    netValue: 0,
    serviceText: '',
    lineText: '',
    lineNumber: '',
    alternatives: '',
    biddersLine: false,
    supplementaryLine: false,
    lotSizeForCostingIsOne: false,
    dontUseFormula: false,
    modelSpecDetailsCode: 0
  };
  addRow() {
    console.log(this.newService);

    if (!this.selectedServiceNumberRecord) { // if user didn't select serviceNumber
      const newRecord = {
        //serviceNumberCode: this.selectedServiceNumber,
        lineTypeCode: this.newService.lineTypeCode,
        unitOfMeasurementCode: this.selectedUnitOfMeasure,
        currencyCode: this.modelSpecRecord.currencyCode,
        personnelNumberCode: this.selectedPersonnelNumber,
        serviceTypeCode: this.selectedServiceType,
        //  materialGroupCode:this.selectedServiceNumberRecord.materialGroupCode,
        //  formulaCode:this.selectedServiceNumberRecord.formulaCode,
        deletionIndicator: this.newService.deletionIndicator,
        shortText: this.shortText,
        quantity: this.newService.quantity,
        grossPrice: this.newService.grossPrice,
        overFulfilmentPercentage: this.newService.overFulfilmentPercentage,
        priceChangedAllowed: this.newService.priceChangedAllowed,
        unlimitedOverFulfillment: this.newService.unlimitedOverFulfillment,
        pricePerUnitOfMeasurement: this.newService.pricePerUnitOfMeasurement,
        externalServiceNumber: this.newService.externalServiceNumber,
        netValue: this.newService.netValue,
        //serviceText:this.selectedServiceNumberRecord.serviceText,
        lineText: this.newService.lineText,
        lineNumber: this.newService.lineNumber,
        alternatives: this.newService.alternatives,
        biddersLine: this.newService.biddersLine,
        supplementaryLine: this.newService.supplementaryLine,
        lotSizeForCostingIsOne: this.newService.lotSizeForCostingIsOne,
        dontUseFormula: this.newService.dontUseFormula
      }
      console.log(newRecord);
      // Remove properties with empty or default values
      const filteredRecord = Object.fromEntries(
        Object.entries(newRecord).filter(([_, value]) => {
          return value !== '' && value !== 0 && value !== false && value !== undefined;
        })
      );
      console.log(filteredRecord);
      this.apiService.post<ModelSpecDetails>('modelspecdetails', filteredRecord).subscribe((response: ModelSpecDetails) => {
        console.log('modelspecdetails created:', response);
        if (response) {
          this.resetNewService();
          console.log(this.newService);

        }
        console.log(response);
        this.modelSpecDetailsService.getRecords();
      });
    }
    else {
      // save in the newRecord + basic fields 
      // shortTextInput or the edited shortText
      // unitOfMeasure
      // serviceText
      // quantity
    }
    // const newRecord = new ModelSpecDetails(this.selectedServiceNumber, this.newService.lineTypeCode,
    //   this.selectedServiceNumberRecord.unitOfMeasurementCode,
    //   this.modelSpecRecord.currencyCode, this.selectedPersonnelNumber, this.selectedServiceType,
    //   this.selectedServiceNumberRecord.materialGroupCode, this.selectedServiceNumberRecord.formulaCode,
    //   this.newService.deletionIndicator, this.selectedServiceNumberRecord.description, this.newService.quantity,
    //   this.newService.grossPrice, this.newService.overFulfilmentPercentage, this.newService.priceChangedAllowed
    //   , this.newService.unlimitedOverFulfillment, this.newService.pricePerUnitOfMeasurement, this.newService.externalServiceNumber,
    //   this.newService.netValue, this.selectedServiceNumberRecord.serviceText, this.newService.lineText, this.newService.lineNumber,
    //   this.newService.alternatives, this.newService.biddersLine, this.newService.supplementaryLine, this.newService.lotSizeForCostingIsOne, this.newService.dontUseFormula)
    let newRecord = {
      serviceNumberCode: this.selectedServiceNumber,
      lineTypeCode: this.newService.lineTypeCode,
      unitOfMeasurementCode: this.selectedServiceNumberRecord.unitOfMeasurementCode,
      currencyCode: this.modelSpecRecord.currencyCode,
      personnelNumberCode: this.selectedPersonnelNumber,
      serviceTypeCode: this.selectedServiceType,
      materialGroupCode: this.selectedServiceNumberRecord.materialGroupCode,
      formulaCode: this.selectedServiceNumberRecord.formulaCode,
      deletionIndicator: this.newService.deletionIndicator,
      shortText: this.selectedServiceNumberRecord.description,
      quantity: this.newService.quantity,
      grossPrice: this.newService.grossPrice,
      overFulfilmentPercentage: this.newService.overFulfilmentPercentage,
      priceChangedAllowed: this.newService.priceChangedAllowed,
      unlimitedOverFulfillment: this.newService.unlimitedOverFulfillment,
      pricePerUnitOfMeasurement: this.newService.pricePerUnitOfMeasurement,
      externalServiceNumber: this.newService.externalServiceNumber,
      netValue: this.newService.netValue,
      serviceText: this.selectedServiceNumberRecord.serviceText,
      lineText: this.newService.lineText,
      lineNumber: this.newService.lineNumber,
      alternatives: this.newService.alternatives,
      biddersLine: this.newService.biddersLine,
      supplementaryLine: this.newService.supplementaryLine,
      lotSizeForCostingIsOne: this.newService.lotSizeForCostingIsOne,
      dontUseFormula: this.newService.dontUseFormula
    }
    console.log(newRecord);
    // Remove properties with empty or default values
    const filteredRecord = Object.fromEntries(
      Object.entries(newRecord).filter(([_, value]) => {
        return value !== '' && value !== 0 && value !== false && value !== undefined;
      })
    );
    console.log(filteredRecord);
    this.apiService.post<ModelSpecDetails>('modelspecdetails', filteredRecord).subscribe((response: ModelSpecDetails) => {
      console.log('modelspecdetails created:', response);
      if (response) {
        this.resetNewService();
        //newRecord={}
        console.log(this.newService);
      }
      console.log(response);
      this.modelSpecDetailsService.getRecords();
    });
  }

  resetNewService() {
    this.newService = {
      serviceNumberCode: 0,
      lineTypeCode: 0,
      unitOfMeasurementCode: 0,
      currencyCode: 0,
      personnelNumberCode: 0,
      serviceTypeCode: 0,
      materialGroupCode: 0,
      formulaCode: 0,
      selectionCheckbox: false,
      lineIndex: 0,
      deletionIndicator: false,
      shortText: '',
      quantity: 0,
      grossPrice: 0,
      overFulfilmentPercentage: 0,
      priceChangedAllowed: false,
      unlimitedOverFulfillment: false,
      pricePerUnitOfMeasurement: 0,
      externalServiceNumber: '',
      netValue: 0,
      serviceText: '',
      lineText: '',
      lineNumber: '',
      alternatives: '',
      biddersLine: false,
      supplementaryLine: false,
      lotSizeForCostingIsOne: false,
      dontUseFormula: false,
      modelSpecDetailsCode: 0
    };
  }
}
