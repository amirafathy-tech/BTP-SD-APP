import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NavigationExtras, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ServiceMaster } from './service-master.model';
import { ServiceMasterService } from './service-master.service';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'app-service-master',
    templateUrl: './service-master-test.component.html',
    styleUrls: ['./service-master.component.scss'],
    providers: [MessageService, ConfirmationService, ServiceMasterService]
})

export class ServiceMasterComponent implements OnInit {

    serviceRecords!: ServiceMaster[];

    // to change Columns View 
    cols!: Column[];
    selectedColumns!: Column[];

    // to handel checkbox selection:
    selectedRecord: ServiceMaster | null = null;

    editMode = false;
    isEditButtonDisabled: boolean = false;
     // Array to store selected records
    selectedRecordCount: number = 0;

    selectedRecordMap: { [key: string]: boolean } = {}; // Map to store selected state of each record

    selectedRecords: any[] = [];
    // onRecordSelectionChange(event: any, record: any) {
    //     const checked = event.checked;

    //     if (checked) {
    //         this.selectedRecord = record
    //         // Add the record to the selectedRecords array if it's not already present
    //         if (!this.selectedRecords.includes(record)) {
    //             this.selectedRecords.push(record);
    //             console.log(this.selectedRecords);

    //             this.selectedRecordCount++;
    //         }
    //     } else {
    //         // Remove the record from the selectedRecords array
    //         const index = this.selectedRecords.indexOf(record);
    //         console.log(index)
    //         if (index !== -1) {
    //             this.selectedRecords.splice(index, 1);
    //             console.log(this.selectedRecords);
    //             this.selectedRecordCount--;
    //         }
    //     }
    // }


    onRecordSelectionChange(event: any, record: any) {
        if (event.checked) {
            this.selectedRecord=record
            console.log(this.selectedRecord);
          console.log(record);

          // Add the record to the selectedRecords array if it's not already present
          if (!this.selectedRecords.includes(record)) {
            this.selectedRecords.push(record);
            console.log(this.selectedRecords);
           // this.selectedRecordCount++;
          }
        } else {
          // Remove the record from the selectedRecords array
          const index = this.selectedRecords.indexOf(record);
          if (index !== -1) {
            this.selectedRecords.splice(index, 1);
            console.log(this.selectedRecords);
           // this.selectedRecordCount--;
          }
        }

        // console.log(this.selectedRecords.length);
        // console.log(this.selectedRecordCount);
        //this.isEditButtonDisabled = this.selectedRecords.length == 1;
      }

    // onRecordSelectionChange(event: any, record: any) {
    //     if (event.checked) {
    //         console.log(record);

    //         // Add the record to the selectedRecords array
    //         this.selectedRecords.push(record);
    //         this.selectedRecordCount++;
    //     } else {
    //         // Remove the record from the selectedRecords array
    //         const index = this.selectedRecords.indexOf(record);
    //         if (index !== -1) {
    //             this.selectedRecords.splice(index, 1);
    //             this.selectedRecordCount--;
    //         }

    //     }
    //     console.log(this.selectedRecords.length);
    //     console.log(this.selectedRecordCount);

    //     this.isEditButtonDisabled = this.selectedRecordCount == 1 && this.selectedRecords.length == 1;
    //     //this.selectedRecordCount=0
    // }

    // onRecordSelectionChange(event: any, record: any) {
    //     // Check if at least one checkbox is selected
    //     const atLeastOneCheckboxSelected = this.serviceRecords.some((r: any) => r.selected);
    //     console.log(atLeastOneCheckboxSelected);

    //     this.isEditButtonDisabled = !atLeastOneCheckboxSelected;
    //     console.log(this.isEditButtonDisabled);

    //   }


    // onRecordSelectionChange(event: any, record: ServiceMaster) {
    //     console.log("heree");
    //     if (event.checked) {
    //         this.editMode = true;
    //         this.selectedRecord = record;
    //         // const navigationExtras: NavigationExtras = {
    //         //     state: {
    //         //       Record:record
    //         //     }
    //         //   };
    //         //   console.log(navigationExtras);
    //         // this.router.navigate(['/servicemaster-add'],navigationExtras);
    //         console.log(this.selectedRecord);
    //         const editButton = event.originalEvent.target.closest('.edit-button');
    //         console.log(editButton);

    //         if (editButton) {
    //             // Perform the desired action for the "Edit" button
    //             console.log('Edit button pressed');
    //             // Add your code here
    //         }


    //     } else {
    //         this.editMode = false;
    //         this.selectedRecord = null;
    //     }
    // }


    selectedProductIds: string[] = [];

    updateSelectedProductIds(event: any, productId: number) {
        if (event.checked) {
            //   this.selectedProductIds.push(productId);
            //   console.log(this.selectedProductIds);
            console.log(productId);

        }
        // else {
        //   const index = this.selectedProductIds.indexOf(productId);
        //   if (index !== -1) {
        //     this.selectedProductIds.splice(index, 1);
        //   }
        // }
    }


    submitted: boolean = false;

    statuses!: any[];

    constructor(private serviceMasterService: ServiceMasterService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private cd: ChangeDetectorRef) { }



    ngOnInit() {
        this.serviceRecords = this.serviceMasterService.getRecords();
        console.log(this.serviceRecords);
        this.cd.markForCheck();

        this.cols = [
            { field: 'code', header: 'Service Number' },
            // { field: 'unitOfMeasure', header: 'Unit Of Measure' },
            { field: 'description', header: 'Description' },
            { field: 'lastChangeDate', header: 'Last Change Date' },
            { field: 'serviceType', header: 'Service Type' }
        ];
        this.selectedColumns = this.cols;
    }
    onColumnSelectionChange() {
        // Update the selected columns when the selection changes
        this.selectedColumns = this.cols.filter(col => this.selectedColumns.includes(col));
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected records?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            // accept: () => {
            //     this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
            //     this.selectedProducts = null;
            //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Records Deleted', life: 3000 });
            // }
        });
    }

    // Service Master 
    editRecord(record: ServiceMaster) {
        const navigationExtras: NavigationExtras = {
            state: {
                Record: record
            }
        };
        console.log(navigationExtras);
        this.router.navigate(['/servicemaster-add'], navigationExtras);
    }

    copyRecord(record: ServiceMaster) {
        const navigationExtras: NavigationExtras = {
            state: {
                Record: record,
                Copy: true
            }
        };
        console.log(navigationExtras);
        this.router.navigate(['/servicemaster-add'], navigationExtras);
    }

    navigateEditService() {
        const navigationExtras: NavigationExtras = {
            state: {
                Record: this.selectedRecord,
            }
        };
        console.log(navigationExtras);
        if (this.selectedRecords.length > 0) {
            this.router.navigate(['/servicemaster-add'], navigationExtras);
        }
    }

    navigateCopyService() {
        const navigationExtras: NavigationExtras = {
            state: {
                Record: this.selectedRecord,
                Copy: true
            }
        };
        console.log(navigationExtras);
        if (this.selectedRecords.length > 0) {
            this.router.navigate(['/servicemaster-add'], navigationExtras);
        }
    }

    navigateAddServices() {
        // if(this.selectedRecords.length == 1){
        this.router.navigate(['/servicemaster-add']);
        // }
        // else{
        //     console.log("more than one record");
        //     console.log(this.selectedRecords.length);


        // }

    }

    // Export Data to Excel Sheet
    // exportExcel() {
    //     import('xlsx').then((xlsx) => {
    //         const worksheet = xlsx.utils.json_to_sheet(this.serviceRecords);
    //         const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //         this.saveAsExcelFile(excelBuffer, 'services');
    //     });
    // }
    exportExcel() {
        import('xlsx').then((xlsx) => {
            console.log(this.selectedRecords.length);
            console.log(this.selectedRecords);
            const selectedRows = this.selectedRecords.length > 0 ? this.selectedRecords : this.serviceRecords;
            const worksheet = xlsx.utils.json_to_sheet(selectedRows);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'services');
        });
    }
    // exportExcel() {
    //     import('xlsx').then((xlsx) => {
    //       const checkedRowsExist = Object.values(this.selectedRecordMap).some((value) => value === true);
    //       const selectedRows = checkedRowsExist ? this.selectedRecords.filter((record) => this.selectedRecordMap[record.id]) : this.serviceRecords;
    //       const worksheet = xlsx.utils.json_to_sheet(selectedRows);
    //       const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //       this.saveAsExcelFile(excelBuffer, 'services');
    //     });
    //   }
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}
