import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { ModelEntity } from '../model.model';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';


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

  ngOnInit() {
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Added Successfully' }];
  }

  constructor(private modelService: ModelService,private messageService: MessageService) {
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
}

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value)
    const newRecord = new ModelEntity(value.id, value.modelServSpec, value.blockingIndicator, value.serviceSelection, value.description,
      value.searchTerm, value.purchaseOrgnization, value.contract);
    this.modelService.addRecord(newRecord);
    this.successMessage=true;
  }
}
