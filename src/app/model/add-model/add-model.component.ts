import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { ModelEntity } from '../model.model';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/ApiService.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css'],
  providers: [ModelService, MessageService, ConfirmationService]
})
export class AddModelComponent implements OnInit {

  @ViewChild('f', { static: false })
  slForm!: NgForm;
  recordsCurrency!: any[];
  selectedCurrency!: number;

  constructor(private modelService: ModelService, private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,) {
  }

  ngOnInit() {
    this.apiService.get<any[]>('currencies').subscribe(response => {
      this.recordsCurrency = response;
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new ModelEntity(this.selectedCurrency, value.modelServSpec, value.blockingIndicator, value.serviceSelection, value.description,
      value.searchTerm);
      
      this.apiService.post<ModelEntity>('modelspecs', newRecord).subscribe(
        (response: ModelEntity) => {
          console.log('model specs created:', response);
          if (response) {
            this.confirmationService.confirm({
              message: `Model ${response.modelSpecCode} Added successfully. Click Yes to go to the Main Page.`,
              header: 'Added Successfully',
              icon: 'pi pi-check',
              accept: () => {
                this.router.navigate(['/model']);
              },
              reject: undefined
            });
          }
          this.modelService.getRecords();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            // Handle conflict error
            console.log('Conflict error:', error);
            this.messageService.add({ severity: 'error', summary: 'Code Conflict', detail: 'This Code already exists', life: 10000 });
            // this.ngOnInit();
          } else {
            console.error('An error occurred:', error);
          }
          this.modelService.getRecords();
        }
      );
  }
}
