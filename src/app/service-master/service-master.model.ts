import { Instant } from "js-joda";

 export class ServiceMaster {
  public serviceNumberCode!: number;
    public code: string;
    public description: string;
    public serviceText: string;
    public shortTextChangeAllowed: boolean;
    public deletionIndicator: boolean;
    public mainItem: boolean;
    public numberToBeConverted: number;
    public convertedNumber: number;
    
    public formulaCode: number;
    public unitOfMeasurementCode:number;
    public serviceTypeCode: number;
    public materialGroupCode: number;

    public lastChangeDate:Instant;
   
    constructor(code: string,description: string,serviceText: string, shortTextChangeAllowed: boolean,deletionIndicator: boolean,mainItem: boolean,
        numberToBeConverted: number,
        convertedNumber: number,
        formulaCode: number,unitOfMeasurementCode:number,serviceTypeCode: number,materialGroupCode: number,
        lastChangeDate:Instant
    ) {
     //this.serviceNumberCode = serviceNumberCode;
        this.code = code;
      this.description=description;
      this.serviceText=serviceText;
      this.shortTextChangeAllowed=shortTextChangeAllowed;
      this.deletionIndicator=deletionIndicator; 
      this.mainItem=mainItem;
      this.numberToBeConverted=numberToBeConverted;
      this.convertedNumber=convertedNumber;
      
      this.formulaCode=formulaCode;
      this.unitOfMeasurementCode=unitOfMeasurementCode;
      this.serviceTypeCode=serviceTypeCode;
      this.materialGroupCode=materialGroupCode;

      this.lastChangeDate=lastChangeDate;
    }
}