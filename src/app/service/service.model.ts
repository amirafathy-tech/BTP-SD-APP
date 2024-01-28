export class Service {
    public id: number;
    public selectionCheckbox: boolean;
    public lineIndex: number;
    public deletionIndicator: boolean;
    public shortText: string;
    public quantity: number;
    public grossPrice:number;
    public overFulfilmentPercentage:number;
    public priceChangedAllowed: boolean;
    public UnlimitedOverFulfilment:boolean;
    public pricePerUnitOfMeasurement:number;
    public externalServiceNumber: string;
    public netValue:number;
    public serviceText: string;
    public lineText: string;
    public formula: string;
    public lineNumber: string;
    public alternatives: string;
    public biddersLine:boolean;
    public supplementaryLine:boolean;
    public lotSizeForCostingIsOne:boolean;
    
    constructor(id:number,selectionCheckbox:boolean,lineIndex: number,deletionIndicator: boolean,shortText: string,
        quantity: number,grossPrice:number,overFulfilmentPercentage:number,priceChangedAllowed: boolean,
        UnlimitedOverFulfilment:boolean,pricePerUnitOfMeasurement:number,externalServiceNumber: string,
        netValue:number,serviceText: string,lineText: string, formula: string, lineNumber: string,
        alternatives: string,biddersLine:boolean,supplementaryLine:boolean,lotSizeForCostingIsOne:boolean
    ) {
        this.id = id;
      this.selectionCheckbox=selectionCheckbox;
      this.lineIndex=lineIndex;
      this.deletionIndicator=deletionIndicator; 
      this.shortText=shortText;
      this.quantity=quantity;
      this.grossPrice=grossPrice;
      this.overFulfilmentPercentage=overFulfilmentPercentage;
      this.priceChangedAllowed=priceChangedAllowed;
      this.UnlimitedOverFulfilment=UnlimitedOverFulfilment;
      this.pricePerUnitOfMeasurement=pricePerUnitOfMeasurement;
      this.externalServiceNumber=externalServiceNumber;
      this.netValue=netValue;
      this.serviceText=serviceText;
      this.lineText=lineText;
      this.formula=formula;
      this.lineNumber=lineNumber;
      this.alternatives=alternatives;
      this.biddersLine=biddersLine; 
      this.supplementaryLine=supplementaryLine;
      this.lotSizeForCostingIsOne=lotSizeForCostingIsOne;
    }
}