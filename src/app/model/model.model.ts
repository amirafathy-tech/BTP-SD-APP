export class ModelEntity {
    public id: number;
    public modelServSpec: string;
    public blockingIndicator: boolean;
    public serviceSelection: boolean;
    public description: string;
    public searchTerm: string;
    public purchaseOrgnization:string;
    public contract:string;
   
    constructor(id:number,modelServSpec: string,blockingIndicator: boolean,serviceSelection: boolean,description: string,
        searchTerm: string,purchaseOrgnization:string,contract:string
    ) {
        this.id = id;
      this.modelServSpec=modelServSpec;
      this.blockingIndicator=blockingIndicator;
      this.serviceSelection=serviceSelection; 
      this.description=description;
      this.searchTerm=searchTerm;
      this.purchaseOrgnization=purchaseOrgnization;
      this.contract=contract;
    }
}