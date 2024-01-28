import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiceDetailService } from '../service/service.service';
import { Service } from '../service/service.model';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css'],
  providers: [ServiceDetailService,MessageService]
})
export class ServiceTestComponent {

  products!: Service[];

    // statuses!: SelectItem[];

    clonedProducts: { [s: string]: Service } = {};

    constructor(private detailsService: ServiceDetailService, private messageService: MessageService) {}

    ngOnInit() {
      this.products= this.detailsService.getRecords();
        // this.productService.getProductsMini().then((data) => {
        //     this.products = data;
        // });

        // this.statuses = [
        //     { label: 'In Stock', value: 'INSTOCK' },
        //     { label: 'Low Stock', value: 'LOWSTOCK' },
        //     { label: 'Out of Stock', value: 'OUTOFSTOCK' }
        // ];
    }

    onRowEditInit(product: Service) {
        // this.clonedProducts[product.id as string] = { ...product };
    }

    onRowEditSave(index:number,product: Service) {
      this.products[index] = product;
      console.log(this.products)
      //this.recordsChanged.next(this.records.slice());
     // this.detailsService.updateRecord(index,product);
    this.ngOnInit(); //reload the table
        // if (product.price > 0) {
        //     delete this.clonedProducts[product.id as string];
        //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        // } else {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        // }
    }

    onRowEditCancel(product: Service, index: number) {
        // this.products[index] = this.clonedProducts[product.id as string];
        // delete this.clonedProducts[product.id as string];
    }
}
