import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelService } from './model.service';
import { ModelEntity } from './model.model';
import { NgForm, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  providers:[ModelService]
})
export class ModelComponent implements OnInit {

  records!: ModelEntity[];
  selectedRecords!: ModelEntity;
  @ViewChild('f', { static: false })
  slForm!: NgForm;

  modalVisible: boolean = false;
  subscription!: Subscription;
  showDialog() {
      //this.modalVisible = true;
      this.router.navigate(['/modeladd']);
  }
  deleteDialog: boolean = false;

  showDeleteDialog() {
      this.deleteDialog = true;
  }

  editMode = false;

  saveRecord(index:number,record: ModelEntity) {
    this.modelService.updateRecord(index,record);
    this.ngOnInit(); //reload the table
    this.editMode = false;
  }

  constructor(private modelService: ModelService, private modalService: NgbModal, private fb: FormBuilder,
    private router: Router) {
  }
  navigateServices(record:ModelEntity){
    console.log(record);
    const navigationExtras: NavigationExtras = {
      state: {
        Record:record
      }
    };
    
    this.router.navigate(['/serviceTest'],navigationExtras);
  }

  // deleteRecord(index:number){
  //   this.modelService.deleteRecord(index);
  //   this.ngOnInit(); //reload the table
  // }
  deleteRecord(record: ModelEntity) {
        const index = this.records.indexOf(record);
        if (index !== -1) {
          this.records.splice(index, 1);
        }
  }

 
  ngOnInit() {
    this.modelService.getRecords();
    this.subscription = this.modelService.recordsChanged.subscribe((records: ModelEntity[]) => {
      this.records = records;
      console.log(this.records);
    });
    // this.records = this.modelService.getRecords();
    // this.editForm = this.fb.group({
    //   projectCode: [''],
    //   projectId: [''],
    //   projectDescription: [''],
    //   validFrom: [''],
    //   profit: [''],
    // })
  }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const newRecord = new ModelEntity(value.id, value.modelServSpec, value.blockingIndicator, value.serviceSelection, value.description,
  //     value.searchTerm,value.purchaseOrgnization,value.contract);
  //  this.modelService.addRecord(newRecord);
  //   this.ngOnInit(); //reload the table
  // }
}

