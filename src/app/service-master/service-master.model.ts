import { Instant } from "js-joda";

 export class ServiceMaster {
  public serviceNumberCode!: number;
    public searchTerm: string;
    public description: string;
    public serviceText: string;
    public shortTextChangeAllowed: boolean;
    public deletionIndicator: boolean;
    public mainItem: boolean;
    public numberToBeConverted: number;
    public convertedNumber: number;
   // public formulaCode: number;
   // public unitOfMeasurementCode:number;
    public serviceTypeCode: string;
    public materialGroupCode: string;
    //public lastChangeDate:Date;
    public baseUnitOfMeasurement:string;
    public toBeConvertedUnitOfMeasurement:string
    public defaultUnitOfMeasurement:string;
   
    constructor(searchTerm: string,description: string,serviceText: string, shortTextChangeAllowed: boolean,deletionIndicator: boolean,mainItem: boolean,
        numberToBeConverted: number,
        convertedNumber: number,
        //formulaCode: number,
        //unitOfMeasurementCode:number,
        serviceTypeCode: string,materialGroupCode: string,
        //lastChangeDate:Date,
       baseUnitOfMeasurement:string,toBeConvertedUnitOfMeasurement:string,
        defaultUnitOfMeasurement:string
    ) {
     //this.serviceNumberCode = serviceNumberCode;
        this.searchTerm = searchTerm;
      this.description=description;
      this.serviceText=serviceText;
      this.shortTextChangeAllowed=shortTextChangeAllowed;
      this.deletionIndicator=deletionIndicator; 
      this.mainItem=mainItem;
      this.numberToBeConverted=numberToBeConverted;
      this.convertedNumber=convertedNumber;
     // this.formulaCode=formulaCode;
    // this.unitOfMeasurementCode=unitOfMeasurementCode;
      this.serviceTypeCode=serviceTypeCode;
      this.materialGroupCode=materialGroupCode;
      //this.lastChangeDate=lastChangeDate;
      this.baseUnitOfMeasurement=baseUnitOfMeasurement;
      this.toBeConvertedUnitOfMeasurement=toBeConvertedUnitOfMeasurement;
      this.defaultUnitOfMeasurement=defaultUnitOfMeasurement;
    }
}