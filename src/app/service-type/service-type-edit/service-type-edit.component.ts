import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServiceType } from '../service-type.model';
import { ServiceTypeService } from '../service-type.service';

@Component({
  selector: 'app-service-type-edit',
  templateUrl: './service-type-edit.component.html',
  styleUrls: ['./service-type-edit.component.css']
})
export class ServiceTypeEditComponent {

  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: ServiceType;


  constructor(private serviceTypeService: ServiceTypeService) { }

  ngOnInit() {
    this.subscription = this.serviceTypeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.serviceTypeService.getApiRecord(index)
            .subscribe((record: ServiceType) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                serviceId: this.editedItem.serviceId,
                description: this.editedItem.description
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new ServiceType(value.serviceId, value.description);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { serviceTypeCode: this.editedItemIndex, serviceId: value.serviceId, description: value.description };
      console.log(updatedRecord);

      this.serviceTypeService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.serviceTypeService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.serviceTypeService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
