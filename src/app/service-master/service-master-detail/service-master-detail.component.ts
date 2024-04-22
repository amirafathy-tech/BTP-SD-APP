import { Component } from '@angular/core';
import { ServiceMaster } from '../service-master.model';
import { Instant } from 'js-joda';
import { ApiService } from 'src/app/ApiService.service';
import { ServiceMasterService } from '../service-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-service-master-detail',
  templateUrl: './service-master-detail.component.html',
  styleUrls: ['./service-master-detail.component.css'],
  providers: [ApiService, ServiceMasterService, MessageService, ConfirmationService]
})
export class ServiceMasterDetailComponent {

  selectedRecord: ServiceMaster = {
    serviceNumberCode: 0, searchTerm: '', description: '', serviceText: '', shortTextChangeAllowed: false, deletionIndicator: false,
    numberToBeConverted: 0, convertedNumber: 0, mainItem: false,
    // formulaCode: 0,
    //unitOfMeasurementCode:0,
    serviceTypeCode: '', materialGroupCode: 0,
    lastChangeDate: Instant.now(), baseUnitOfMeasurement: '', toBeConvertedUnitOfMeasurement: '', defaultUnitOfMeasurement: ''
  };

  constructor(private apiService: ApiService, private serviceMasterService: ServiceMasterService
    ,  private router: Router,private confirmationService: ConfirmationService, private route: ActivatedRoute) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state?.['RecordDetails'];
      //const copyFlag = this.router.getCurrentNavigation()?.extras.state?.['Copy'];
      console.log(state);
     
      if (state) {
        this.selectedRecord = state;
        console.log(this.selectedRecord);
      }
    }
  }
  navigateMainPage(){
    this.router.navigate(['/servicemaster']);
  }
}
