import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ServiceMasterService } from '../service-master.service';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/ApiService.service';
import { ServiceMaster } from '../service-master.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-service-master-add',
  templateUrl: './service-master-add.component.html',
  styleUrls: ['./service-master-add.component.css'],
  providers: [ApiService, ServiceMasterService, MessageService, ConfirmationService]
})
export class ServiceMasterAddComponent implements OnInit {

  savedRecord!: ServiceMaster;
  public isSaving: boolean = false;
  editMode = false;

  selectedRecord: ServiceMaster = {
    serviceNumberCode: 0, searchTerm: '', description: '', serviceText: '', shortTextChangeAllowed: false, deletionIndicator: false,
    numberToBeConverted: 0, convertedNumber: 0, mainItem: false,
    serviceTypeCode: '', materialGroupCode: '',
    baseUnitOfMeasurement: '', toBeConvertedUnitOfMeasurement: '', defaultUnitOfMeasurement: ''
  };

  @ViewChild('f', { static: false })
  slForm!: NgForm

  // Fields of Dropdowns:
  recordsServiceType!: any[];
  selectedServiceType!: number;
  recordsMeasure!: any[];
  selectedBaseMeasure!: number;
  baseUnitOfMeasurement!: string;
  selectedToBeConvertedMeasure!: string;
  selectedConvertedMeasure!: string;
  recordsMaterialGrp!: any[];
  selectedMaterialGrp!: number;

  constructor(private apiService: ApiService, private serviceMasterService: ServiceMasterService
    , private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService, private route: ActivatedRoute) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state?.['Record'];
      const copyFlag = this.router.getCurrentNavigation()?.extras.state?.['Copy'];
      if (copyFlag) {
        this.selectedRecord = state;
      } else {
        this.selectedRecord = state;
        this.editMode = true;
      }
    }
  }

  ngOnInit() {
    this.apiService.get<any[]>('servicetypes').subscribe(response => {
      this.recordsServiceType = response;
    });
    // this.apiService.get<any[]>('measurements').subscribe(response => {
    //   this.recordsMeasure = response;
    // });
    this.apiService.get<any[]>('materialgroups').subscribe(response => {
      this.recordsMaterialGrp = response;
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      const updatedRecord = {
        serviceNumberCode: this.selectedRecord.serviceNumberCode, searchTerm: value.searchTerm, description: value.description
        , serviceText: value.serviceText, shortTextChangeAllowed: value.shortTextChangeAllowed, deletionIndicator: value.deletionIndicator,
        mainItem: value.mainItem, numberToBeConverted: value.numberToBeConverted,
        convertedNumber: value.convertedNumber,
        serviceTypeCode: this.selectedRecord.serviceTypeCode,
        materialGroupCode: this.selectedRecord.materialGroupCode,
        baseUnitOfMeasurement: this.selectedRecord.baseUnitOfMeasurement,
        toBeConvertedUnitOfMeasurement: this.selectedRecord.toBeConvertedUnitOfMeasurement,
        defaultUnitOfMeasurement: this.selectedRecord.defaultUnitOfMeasurement
      };
      console.log(updatedRecord);
      if (updatedRecord.serviceTypeCode === "" || updatedRecord.serviceTypeCode === null || updatedRecord.baseUnitOfMeasurement === "" || updatedRecord.baseUnitOfMeasurement === null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ServiceType and BaseUnitMeasurement are required',
          life: 5000
        });
      }
      else {
        this.serviceMasterService.updateRecord(this.selectedRecord.serviceNumberCode, updatedRecord);
        this.serviceMasterService.getRecords();
        this.confirmationService.confirm({
          message: `ServiceMaster ${this.selectedRecord.serviceNumberCode} Updated successfully. Click Yes to go to the Main Page.`,
          header: 'Updated Successfully',
          icon: 'pi pi-check',
          accept: () => {
            this.router.navigate(['/servicemaster']);
          },
          reject: undefined
        });
      }
    } else {
      const newRecord = new ServiceMaster(value.searchTerm, value.description,
        value.serviceText, value.shortTextChangeAllowed,
        value.deletionIndicator, value.mainItem, value.numberToBeConverted,
        value.convertedNumber,
        this.selectedRecord.serviceTypeCode, this.selectedRecord.materialGroupCode,
        this.selectedRecord.baseUnitOfMeasurement, this.selectedRecord.toBeConvertedUnitOfMeasurement, this.selectedRecord.defaultUnitOfMeasurement);
      if (this.selectedRecord.serviceTypeCode === "" || this.selectedRecord.baseUnitOfMeasurement === "") {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ServiceType and BaseUnitMeasurement are required',
          life: 5000
        });
      }
      else {
        // Remove properties with empty or default values
        const filteredRecord = Object.fromEntries(
          Object.entries(newRecord).filter(([_, value]) => {
            return value !== '' && value !== 0 && value !== undefined && value !== null;
          })
        );
        console.log(filteredRecord);
        this.apiService.post<ServiceMaster>('servicenumbers', filteredRecord).subscribe((response: ServiceMaster) => {
          console.log('service master created:', response);
          if (response) {
            this.confirmationService.confirm({
              message: `ServiceMaster ${response.serviceNumberCode} Added successfully. Click Yes to go to the Main Page.`,
              header: 'Added Successfully',
              icon: 'pi pi-check',
              accept: () => {
                this.router.navigate(['/servicemaster']);
              },
              reject: () => {
              }
            });
          }
          this.isSaving = true;
          this.serviceMasterService.getRecords();
          this.savedRecord = response
        });
      }
    }
  }
}
