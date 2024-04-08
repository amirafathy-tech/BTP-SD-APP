import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { ModelEntity } from '../model.model';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/ApiService.service';


@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css'],
  providers: [ModelService,MessageService]
})
export class AddModelComponent implements OnInit {
  messages!: Message[];
  successMessage: boolean = false;

  @ViewChild('f', { static: false })
  slForm!: NgForm;

  recordsCurrency!: any[];
  selectedCurrency!: number;

  ngOnInit() {
    this.apiService.get<any[]>('currencies').subscribe(response => {
      console.log(response);
      this.recordsCurrency = response;
      console.log(this.recordsCurrency);
    });
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Added Successfully' }];
  }

  constructor(private modelService: ModelService,private apiService: ApiService,private messageService: MessageService) {
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
}

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value)
    const newRecord = new ModelEntity(this.selectedCurrency,value.modelServSpec, value.blockingIndicator, value.serviceSelection, value.description,
      value.searchTerm);
      this.apiService.post<ModelEntity>('modelspecs', newRecord).subscribe((response: ModelEntity) => {
        console.log('model specs created:', response);
        if(response){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Model Added Successfully' });
        }
        this.modelService.getRecords();
      });
    //this.modelService.addRecord(newRecord);
    //this.successMessage=true;
  }
}
