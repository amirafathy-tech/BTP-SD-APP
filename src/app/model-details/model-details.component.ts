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
@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
  providers: [ModelSpecDetailService, MessageService, ConfirmationService]
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

  retrievedUOM! : UnitOfMeasure
  retrievedMatGrp !:any
  retrievedFormula:any
  // to handle shortTextChangeAlowlled Flag 
  onServiceNumberChange(event: any) {
    const selectedRecord = this.recordsServiceNumber.find(record => record.serviceNumberCode === this.selectedServiceNumber);
    console.log(selectedRecord);

    if (selectedRecord) {
      this.selectedServiceNumberRecord = selectedRecord
      console.log(this.selectedServiceNumberRecord);
      this.apiService.getID<UnitOfMeasure>('measurements', this.selectedServiceNumberRecord.unitOfMeasurementCode).subscribe(response => {
        console.log(response);
        this.retrievedUOM = response;
        console.log(this.retrievedUOM);
      });
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
    //this.selectedServiceNumberRecord = selectedRecord ? selectedRecord: {} ;
    this.shortTextChangeAllowed = this.selectedServiceNumberRecord?.shortTextChangeAllowed || false;
    console.log(this.shortTextChangeAllowed);

    this.shortText = ""
    console.log(this.selectedServiceNumberRecord);

  }
  // to handle selection checkbox
  selectedRecords: ModelSpecDetails[] = [];
  onRecordSelectionChange(event: any, record: any) {
    //console.log(Array.isArray(event.checked));
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

  ngOnInit() {
    this.modelSpecDetailsService.getRecords();
    this.subscription = this.modelSpecDetailsService.recordsChanged.subscribe((records: ModelSpecDetails[]) => {
      this.records = records;
      this.filteredRecords = records
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
              this.modelSpecDetailsService.getRecords();
            });
          }
          this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Deleted', life: 3000 });
          this.selectedAllRecords = [];
        }
      });
    }
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
