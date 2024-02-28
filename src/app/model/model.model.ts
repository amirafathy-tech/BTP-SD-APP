export class ModelEntity {
    public modelSpecCode!: number;
    public currencyCode:number;
    public modelServSpec: string;
    public blockingIndicator: boolean;
    public serviceSelection: boolean;
    public description: string;
    public searchTerm: string;
    // public purchaseOrgnization:string;
    // public contract:string;
   
    constructor(currencyCode:number,modelServSpec: string,blockingIndicator: boolean,serviceSelection: boolean,
        description: string,searchTerm: string
    ) {
       // this.id = id;
       this.currencyCode = currencyCode;
      this.modelServSpec=modelServSpec;
      this.blockingIndicator=blockingIndicator;
      this.serviceSelection=serviceSelection; 
      this.description=description;
      this.searchTerm=searchTerm;
    //   this.purchaseOrgnization=purchaseOrgnization;
    //   this.contract=contract;
    }
}