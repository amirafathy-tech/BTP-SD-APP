import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NavigationExtras, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ServiceMaster } from './service-master.model';
import { ServiceMasterService } from './service-master.service';
import { Subscription } from 'rxjs';

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

    subscription!: Subscription;
    serviceRecords!: ServiceMaster[];

    // to change Columns View 
    cols!: Column[];
    selectedColumns!: Column[];
    // to handel checkbox selection:
    selectedRecord: ServiceMaster | null = null;

    editMode = false;
     // Array to store selected records
    selectedRecords: any[] = [];

    onRecordSelectionChange(event: any, record: any) {
      if (event.checked) {
        console.log(record);
        this.selectedRecord = record
        // Add the record to the selectedRecords array if it's not already present
        if (!this.selectedRecords.includes(record)) {
          this.selectedRecords.push(record);
          console.log(this.selectedRecords);
        }
      } else {
        // Remove the record from the selectedRecords array
        const index = this.selectedRecords.indexOf(record);
        console.log(index)
        if (index !== -1) {
          this.selectedRecords.splice(index, 1);
          console.log(this.selectedRecords);
        }
      }
    }

    submitted: boolean = false;

    constructor(private serviceMasterService: ServiceMasterService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.serviceMasterService.getRecords();
        this.subscription = this.serviceMasterService.recordsChanged.subscribe((records: ServiceMaster[]) => {
          this.serviceRecords = records;
          console.log(this.serviceRecords);
        });
        //this.serviceRecords = this.serviceMasterService.getRecords();
        //console.log(this.serviceRecords);
        this.cd.markForCheck();

        this.cols = [
            { field: 'code', header: 'Service Number' },
            // { field: 'unitOfMeasure', header: 'Unit Of Measure' },
            { field: 'description', header: 'Description' },
            { field: 'lastChangeDate', header: 'Last Change Date' },
            { field: 'serviceTypeCode', header: 'Service Type' }
        ];
        this.selectedColumns = this.cols;
    }

    onColumnSelectionChange() {
        // Update the selected columns when the selection changes
        this.selectedColumns = this.cols.filter(col => this.selectedColumns.includes(col));
    }
    // Service Master 
    navigateEditService() {
        const navigationExtras: NavigationExtras = {
            state: {
                Record: this.selectedRecord,
            }
        };
        console.log(this.selectedRecord);
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
        this.router.navigate(['/servicemaster-add']);
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
