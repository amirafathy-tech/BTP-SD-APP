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
import { PersonnelNumber } from '../models/personnelNumber.model';
import { Instant } from 'js-joda';
@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
  providers: [ModelSpecDetailService, MessageService, ConfirmationService]
})
export class ModelDetailsComponent {
  public rowIndex = 0;
 searchTerm!: number;
//  public isMatch(record: any, ri: number): boolean {
//   const searchString = this.rowIndex + ri + 1;
//   return searchString === this.searchTerm;
// }
public isMatch(record: any, ri: number): boolean {
  if (!this.searchTerm) {
    return true; // Display all records when search term is empty
  }
  const searchString = this.rowIndex + ri + 1;
  return searchString === this.searchTerm;
}
  subscription!: Subscription;
  records!: ModelSpecDetails[];
  recordsLength!: number

  modelSpecRecord!: ModelEntity // hold ModelSpecRecord from previous screen
  currency: any
  totalValue:number =0
  //fields for dropdown lists
  recordsServiceNumber!: ServiceMaster[];
  selectedServiceNumber!: number;
  updateSelectedServiceNumber!: number
  selectedServiceNumberRecord?: ServiceMaster 
  updateSelectedServiceNumberRecord?: ServiceMaster
  shortText: string = '';
  updateShortText: string = '';
  shortTextChangeAllowed: boolean = false;
  updateShortTextChangeAllowed: boolean = false;

  recordsUnitOfMeasure!: UnitOfMeasure[];
  selectedUnitOfMeasure!: string;

  recordsServiceType!: ServiceType[];
  selectedServiceType!: number;

  recordsPersonnelNumber!: PersonnelNumber[];
  selectedPersonnelNumber!: number;

  recordsFormula!: any[];
  selectedFormula!: number;

  recordsMatGrp!: any[];
  selectedMatGrp!: number;

  recordsLineType!: any[];
  selectedLineType!: number;

  // To handle Search Input 
  searchValue: number = 0;
  filteredRecords: ModelSpecDetails[] = this.records;
  onSearchInputChange(): void {
    const index = this.searchValue
    if (index > 0) {
      this.apiService.getID<ModelSpecDetails>('modelspecdetails', index).subscribe(response => {
        console.log(response);
        this.filteredRecords = [response];
        console.log(this.filteredRecords);
      });
    } else {
      this.filteredRecords = this.records;
    }
  }

  //Display Line Details:
  selectedDetailsForDisplay?: ModelSpecDetails 
  visible: boolean = false;
  showDialog() {
      this.visible = true;
  }
  // to handle selection checkbox
  selectedRecords: ModelSpecDetails[] = [];
  onRecordSelectionChange(event: any, record: ModelSpecDetails) {
    console.log(record);
    console.log(this.selectedDetailsForDisplay);
    this.selectedDetailsForDisplay=record
  console.log(this.selectedDetailsForDisplay);

    console.log(event.checked);
    this.selectedRecords = event.checked
    console.log(this.selectedRecords);
  }
  // to handle All Records Selection / Deselection 
  selectedAllRecords: ModelSpecDetails[] = [];
  onSelectAllRecords(event: any): void {
    console.log(event.checked.length)
    if (Array.isArray(event.checked) && event.checked.length > 0) {
      console.log(event);
      this.selectedAllRecords = [...this.records];
      console.log(this.selectedAllRecords);
    } else {
      console.log(event);
      console.log("else heree");
      this.selectedAllRecords = [];
      console.log(this.selectedAllRecords);
    }
  }
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
  retrievedUOM!: UnitOfMeasure
  retrievedMatGrp !: any
  retrievedFormula: any

  updateRetrievedUOM!: UnitOfMeasure
  updateRetrievedMatGrp !: any
  updateRetrievedFormula: any
  dontSelectServiceNumber: boolean =true
  
  //In Creation to handle shortTextChangeAlowlled Flag 
  onServiceNumberChange(event: any) { 
    const selectedRecord = this.recordsServiceNumber.find(record => record.serviceNumberCode === this.selectedServiceNumber);
    console.log(selectedRecord);

    if (selectedRecord) {
      this.selectedServiceNumberRecord = selectedRecord
      this.shortTextChangeAllowed = this.selectedServiceNumberRecord?.shortTextChangeAllowed || false;
      console.log(this.shortTextChangeAllowed);
      this.shortText = ""
      console.log(this.selectedServiceNumberRecord);
      // this.apiService.getID<UnitOfMeasure>('measurements', this.selectedServiceNumberRecord.unitOfMeasurementCode).subscribe(response => {
      //   console.log(response);
      //   this.retrievedUOM = response;
      //   console.log(this.retrievedUOM);
      // });
      this.apiService.getID<any>('materialgroups', this.selectedServiceNumberRecord.materialGroupCode).subscribe(response => {
        console.log(response);
        this.retrievedMatGrp = response;
        console.log(this.retrievedMatGrp);
      });
      this.apiService.getID<any>('formulas', this.selectedServiceNumberRecord.formulaCode).subscribe(response => {
        console.log(response);
        this.retrievedFormula = response;
        console.log(this.retrievedFormula);
      });
    }
    else {
      console.log("no service number");
      this.dontSelectServiceNumber=false
      this.selectedServiceNumberRecord=undefined;
      console.log(this.dontSelectServiceNumber);
      // this.selectedServiceNumberRecord = {
      //   serviceNumberCode: 0, code: '', description: '', serviceText: '', shortTextChangeAllowed: false, deletionIndicator: false,
      //   numberToBeConverted: 0, convertedNumber: 0, mainItem: false,
      //   formulaCode: 0, unitOfMeasurementCode: 0, serviceTypeCode: 0, materialGroupCode: 0,
      //   lastChangeDate: Instant.now()
      // };
      //console.log(this.selectedServiceNumberRecord);
    }
  }
  //In Update to handle shortTextChangeAlowlled Flag 
  onServiceNumberUpdateChange(event: any) {
    console.log(event.value);
    const updateSelectedRecord = this.recordsServiceNumber.find(record => record.serviceNumberCode === event.value);
    console.log(updateSelectedRecord);

    if (updateSelectedRecord) {
      this.updateSelectedServiceNumberRecord = updateSelectedRecord
      console.log(this.updateSelectedServiceNumberRecord);

      this.updateShortTextChangeAllowed = this.updateSelectedServiceNumberRecord?.shortTextChangeAllowed || false;
      console.log(this.updateShortTextChangeAllowed);
      this.updateShortText = ""
      console.log(this.updateSelectedServiceNumberRecord);

      // this.apiService.getID<UnitOfMeasure>('measurements', this.updateSelectedServiceNumberRecord.unitOfMeasurementCode).subscribe(response => {
      //   console.log(response);
      //   this.updateRetrievedUOM = response;
      //   console.log(this.updateRetrievedUOM);
      // });
      this.apiService.getID<any>('materialgroups', this.updateSelectedServiceNumberRecord.materialGroupCode).subscribe(response => {
        console.log(response);
        this.updateRetrievedMatGrp = response;
        console.log(this.updateRetrievedMatGrp);
      });
      this.apiService.getID<any>('formulas', this.updateSelectedServiceNumberRecord.formulaCode).subscribe(response => {
        console.log(response);
        this.updateRetrievedFormula = response;
        console.log(this.updateRetrievedFormula);
      });
    }
    else{
      this.updateSelectedServiceNumberRecord=undefined;
    }
    //this.selectedServiceNumberRecord = selectedRecord ? selectedRecord: {} ;
  }

  ngOnInit() {
    this.modelSpecDetailsService.getRecords();
    this.subscription = this.modelSpecDetailsService.recordsChanged.subscribe((records: ModelSpecDetails[]) => {
      this.records = records;
      this.filteredRecords = records
      console.log(this.records);
      for (const record of records) {
        console.log(record.netValue);
        this.totalValue += record.netValue;
      }
      console.log('Total Value:', this.totalValue);
    });

    this.apiService.get<ServiceMaster[]>('servicenumbers').subscribe(response => {
      console.log(response);
     // this.recordsServiceNumber = response;
     this.recordsServiceNumber= response.filter(record => record.deletionIndicator === false);
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
    this.apiService.get<any[]>('formulas').subscribe(response => {
      console.log(response);
      this.recordsFormula = response;
      console.log(this.recordsFormula);
    });
    this.apiService.get<any[]>('materialgroups').subscribe(response => {
      console.log(response);
      this.recordsMatGrp = response;
      console.log(this.recordsMatGrp);
    });
  }
  // handle Deletion Record/ Records
  deleteRecord() {
    if (this.selectedRecords.length) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected record?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          for (const record of this.selectedRecords) {
            this.apiService.delete<ModelSpecDetails>('modelspecdetails', record.modelSpecDetailsCode).subscribe(response => {
              console.log('model spec deleted:', response);
              this.totalValue=0;
              this.modelSpecDetailsService.getRecords();
            });
          }
          this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Deleted', life: 3000 });
          this.selectedRecords = []; // Clear the selectedRecords array after deleting all records
        }
      });
    }
    if (this.selectedAllRecords.length) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected record?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          for (const record of this.selectedAllRecords) {
            this.apiService.delete<ModelSpecDetails>('modelspecdetails', record.modelSpecDetailsCode).subscribe(response => {
              console.log('model spec deleted:', response);
              this.totalValue=0;
              this.modelSpecDetailsService.getRecords();
            });
          }
          this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Deleted', life: 3000 });
          this.selectedAllRecords = [];
        }
      });
    }
  }
  // For Edit 
  clonedModelSpecDetails: { [s: number]: ModelSpecDetails } = {};
  onRowEditInit(record: ModelSpecDetails) {
    this.clonedModelSpecDetails[record.modelSpecDetailsCode] = { ...record };
    console.log(this.clonedModelSpecDetails);
  }
  onRowEditSave(index: number, record: ModelSpecDetails) {
    console.log(index)
    console.log(record)
    console.log(this.updateSelectedServiceNumber);
    if (this.updateSelectedServiceNumberRecord) {
      const newRecord: ModelSpecDetails = {
        ...record, // Copy all properties from the original record
        // Modify specific attributes
        // will be updated in New Deployment
        unitOfMeasurementCode: this.updateSelectedServiceNumberRecord.baseUnitOfMeasurement,
        materialGroupCode: this.updateSelectedServiceNumberRecord.materialGroupCode,
        formulaCode: this.updateSelectedServiceNumberRecord.formulaCode,
        shortText: this.updateSelectedServiceNumberRecord.description,
        serviceText: this.updateSelectedServiceNumberRecord.serviceText,
        quantity: this.updateRetrievedFormula.result,
      };
      console.log(newRecord);
      this.apiService.put<ModelSpecDetails>('modelspecdetails', index, newRecord).subscribe(response => {
        console.log('modelspecDetail updated:', response);
        if (response) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record is updated' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Data' });
        }
        console.log(this.totalValue)
        this.totalValue=0;
      this.modelSpecDetailsService.getRecords();
        console.log(this.totalValue)
      });
    }
    else {
      this.apiService.put<ModelSpecDetails>('modelspecdetails', index, record).subscribe(response => {
        console.log('modelspecDetail updated:', response);
        if (response) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record is updated' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Data' });
        }
        this.totalValue=0;
        this.modelSpecDetailsService.getRecords();
      });
    }
  }
  onRowEditCancel(row: ModelSpecDetails, index: number) {
    console.log(this.records[index]);
    this.records[index] = this.clonedModelSpecDetails[row.modelSpecDetailsCode]
    delete this.clonedModelSpecDetails[row.modelSpecDetailsCode]
  }
  // For Add new Record
  newService: ModelSpecDetails = {
    serviceNumberCode: 0,
    lineTypeCode: 0,
    unitOfMeasurementCode: '',
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
        lineTypeCode: this.selectedLineType,
        unitOfMeasurementCode: this.selectedUnitOfMeasure,
        currencyCode: this.modelSpecRecord.currencyCode,
        personnelNumberCode: this.selectedPersonnelNumber,
        serviceTypeCode: this.selectedServiceType,
         materialGroupCode:this.selectedMatGrp,
          formulaCode:this.selectedFormula,
        deletionIndicator: this.newService.deletionIndicator,
        shortText: this.newService.shortText,
        quantity: this.newService.quantity,
        grossPrice: this.newService.grossPrice,
        overFulfilmentPercentage: this.newService.overFulfilmentPercentage,
        priceChangedAllowed: this.newService.priceChangedAllowed,
        unlimitedOverFulfillment: this.newService.unlimitedOverFulfillment,
        pricePerUnitOfMeasurement: this.newService.pricePerUnitOfMeasurement,
        externalServiceNumber: this.newService.externalServiceNumber,
        netValue: this.newService.netValue,
        serviceText:this.newService.serviceText,
        lineText: this.newService.lineText,
        lineNumber: this.newService.lineNumber,
        alternatives: this.newService.alternatives,
        biddersLine: this.newService.biddersLine,
        supplementaryLine: this.newService.supplementaryLine,
        lotSizeForCostingIsOne: this.newService.lotSizeForCostingIsOne,
        dontUseFormula: this.newService.dontUseFormula
      }
      if(this.newService.quantity===0 || this.newService.grossPrice===0){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Quantity and GrossPrice are required',
          life: 3000
        });
      }
      console.log(newRecord);
      // Remove properties with empty or default values
      const filteredRecord = Object.fromEntries(
        Object.entries(newRecord).filter(([_, value]) => {
          return value !== '' && value !== 0  && value !== undefined;
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
        this.totalValue=0;
        this.modelSpecDetailsService.getRecords();
      });
    }
    else if (this.selectedServiceNumberRecord && this.newService.dontUseFormula) {

      console.log(this.selectedServiceNumberRecord.description);
      const newRecord = {
        serviceNumberCode: this.selectedServiceNumber,
        lineTypeCode: this.selectedLineType,
         // will be updated in New Deployment
        unitOfMeasurementCode:this.selectedServiceNumberRecord.baseUnitOfMeasurement,
        currencyCode: this.modelSpecRecord.currencyCode,
        personnelNumberCode: this.selectedPersonnelNumber,
        serviceTypeCode: this.selectedServiceType,
         materialGroupCode:this.selectedServiceNumberRecord.materialGroupCode,
        // formulaCode:this.selectedServiceNumberRecord.formulaCode,
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
        serviceText:this.selectedServiceNumberRecord.serviceText,
        lineText: this.newService.lineText,
        lineNumber: this.newService.lineNumber,
        alternatives: this.newService.alternatives,
        biddersLine: this.newService.biddersLine,
        supplementaryLine: this.newService.supplementaryLine,
        lotSizeForCostingIsOne: this.newService.lotSizeForCostingIsOne,
        dontUseFormula: this.newService.dontUseFormula
      }
      if(this.newService.quantity===0 || this.newService.grossPrice===0){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Quantity and GrossPrice are required',
          life: 3000
        });
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
        this.totalValue=0;
       this.modelSpecDetailsService.getRecords();
      });
    }
    else if (this.selectedServiceNumberRecord && !this.newService.dontUseFormula) {
      const newRecord = {
        serviceNumberCode: this.selectedServiceNumber,
        lineTypeCode: this.selectedLineType,
        unitOfMeasurementCode: this.selectedServiceNumberRecord.baseUnitOfMeasurement,
        currencyCode: this.modelSpecRecord.currencyCode,
        personnelNumberCode: this.selectedPersonnelNumber,
        serviceTypeCode: this.selectedServiceType,
        //  materialGroupCode:this.selectedServiceNumberRecord.materialGroupCode,
         formulaCode:this.selectedServiceNumberRecord.formulaCode,
        deletionIndicator: this.newService.deletionIndicator,
        shortText: this.shortText,
        quantity: this.retrievedFormula.result,
        grossPrice: this.newService.grossPrice,
        overFulfilmentPercentage: this.newService.overFulfilmentPercentage,
        priceChangedAllowed: this.newService.priceChangedAllowed,
        unlimitedOverFulfillment: this.newService.unlimitedOverFulfillment,
        pricePerUnitOfMeasurement: this.newService.pricePerUnitOfMeasurement,
        externalServiceNumber: this.newService.externalServiceNumber,
        netValue: this.newService.netValue,
        serviceText:this.selectedServiceNumberRecord.serviceText,
        lineText: this.newService.lineText,
        lineNumber: this.newService.lineNumber,
        alternatives: this.newService.alternatives,
        biddersLine: this.newService.biddersLine,
        supplementaryLine: this.newService.supplementaryLine,
        lotSizeForCostingIsOne: this.newService.lotSizeForCostingIsOne,
        dontUseFormula: this.newService.dontUseFormula
      }
      if(this.newService.grossPrice===0){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'GrossPrice is required',
          life: 3000
        });
      }
      console.log(newRecord);
      // Remove properties with empty or default values
      const filteredRecord = Object.fromEntries(
        Object.entries(newRecord).filter(([_, value]) => {
          return value !== '' && value !== 0  && value !== undefined;
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
        this.totalValue=0;
        this.modelSpecDetailsService.getRecords();
      });
    }
    else {
      let newRecord = {
        serviceNumberCode: this.selectedServiceNumber,
        lineTypeCode: this.selectedLineType,
         // will be updated in New Deployment
       unitOfMeasurementCode: this.selectedServiceNumberRecord.baseUnitOfMeasurement,
        currencyCode: this.modelSpecRecord.currencyCode,
        personnelNumberCode: this.selectedPersonnelNumber,
        serviceTypeCode: this.selectedServiceType,
        materialGroupCode: this.selectedServiceNumberRecord.materialGroupCode,
        formulaCode: this.selectedServiceNumberRecord.formulaCode,
        deletionIndicator: this.newService.deletionIndicator,
        shortText: this.selectedServiceNumberRecord.description,
        quantity: this.retrievedFormula.result,
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
      if(this.newService.grossPrice===0){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'GrossPrice is required',
          life: 3000
        });
      }
      console.log(newRecord);
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
        this.totalValue=0;
        this.modelSpecDetailsService.getRecords();
      });
    }
  }

  resetNewService() {
    this.newService = {
      serviceNumberCode: 0,
      lineTypeCode: 0,
      unitOfMeasurementCode: '',
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
