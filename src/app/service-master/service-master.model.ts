import { Instant } from "js-joda";

 export class ServiceMaster {
  public id: number;
    public code: string;
    public description: string;
    public shortTextChangeAllowed: boolean;
    public deletionIndicator: boolean;
    public mainItem: boolean;
    public numberToBeConverted: number;
    public convertedNumber: number;
    public lastChangeDate:Instant;
   
    constructor(id: number,code: string,description: string,shortTextChangeAllowed: boolean,deletionIndicator: boolean,mainItem: boolean,
        numberToBeConverted: number,
        convertedNumber: number,lastChangeDate:Instant
    ) {
      this.id = id;
        this.code = code;
      this.description=description;
      this.shortTextChangeAllowed=shortTextChangeAllowed;
      this.deletionIndicator=deletionIndicator; 
      this.mainItem=mainItem;
      this.numberToBeConverted=numberToBeConverted;
      this.convertedNumber=convertedNumber;
      this.lastChangeDate=lastChangeDate;
    }
}