import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ServiceDetailService } from './service.service';
import { Service } from './service.model';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers:[ServiceDetailService]

})
export class ServiceComponent {

  @ViewChild('f', { static: false })
  slForm!: NgForm;
  @Input()
  detail!: Service;
 @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  });



  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  cities: City[] | undefined;

  selectedCity: City | undefined;


  newService!: Service;

  closeResult!: string;
  isNewRecordVisible: boolean = false;
  newRecord: any = {};
  records!: Service[];

  selectedProducts!: Service;

  constructor(private detailsService: ServiceDetailService,private modalService: NgbModal, private fb: FormBuilder,
    ) {}

  ngOnInit() {
    this.records=  this.detailsService.getRecords();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }
  addNewService() {
    this.isNewRecordVisible = true;
    // Create a new empty service object
    //this.newService = new Details();
  
    // Add the new service to the records array
    // this.records.push(this.newService);
  }
  // onSubmit(newService: Details) {
  //   this.detailsService.addRecord(newService);
  //   this.ngOnInit(); //reload the table
  //   // Perform any necessary validation or data manipulation before saving
  
  //   // Reset the newService object to create a new empty row
  //   // this.newService = new Details();
  // }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new Service(value.id, value.selectionCheckbox, value.lineIndex, value.deletionIndicator, value.shortText,
      value.quantity,value.grossPrice,value.overFulfilmentPercentage,value.priceChangedAllowed,value.UnlimitedOverFulfilment,
      value.pricePerUnitOfMeasurement,value.externalServiceNumber,value.netValue,value.serviceText,value.lineText,
      value.formula,value.lineNumber,value.alternatives,value.biddersLine,value.supplementaryLine,value.lotSizeForCostingIsOne);
   this.detailsService.addRecord(newRecord);
    this.ngOnInit(); //reload the table
  }
}
