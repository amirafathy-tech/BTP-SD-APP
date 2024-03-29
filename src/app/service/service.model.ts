export class ModelSpecDetails {
    public modelSpecDetailsCode!: number;
    public serviceNumberCode: number;
    public lineTypeCode: number;
    public unitOfMeasurementCode: number;// will be mandatory if service number could be empty
    public currencyCode: number;
    public personnelNumberCode: number;
    public serviceTypeCode: number;
    public materialGroupCode: number;
    public formulaCode: number;

    public selectionCheckbox: boolean;

    public lineIndex: number;
    
    public deletionIndicator: boolean;
    public shortText: string;
    public quantity: number;
    public grossPrice:number;
    public overFulfilmentPercentage:number;
    public priceChangedAllowed: boolean;
    public unlimitedOverFulfillment:boolean;
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
    public dontUseFormula:boolean;
    
    constructor(serviceNumberCode: number,lineTypeCode: number,unitOfMeasurementCode: number,currencyCode: number,
        personnelNumberCode: number,serviceTypeCode: number,materialGroupCode: number,formulaCode: number,
        selectionCheckbox:boolean,lineIndex: number,deletionIndicator: boolean,shortText: string,
        quantity: number,grossPrice:number,overFulfilmentPercentage:number,priceChangedAllowed: boolean,
        unlimitedOverFulfillment:boolean,pricePerUnitOfMeasurement:number,externalServiceNumber: string,
        netValue:number,serviceText: string,lineText: string, formula: string, lineNumber: string,
        alternatives: string,biddersLine:boolean,supplementaryLine:boolean,lotSizeForCostingIsOne:boolean,dontUseFormula:boolean
    ) {
       // this.id = id;
       this.serviceNumberCode=serviceNumberCode;
       this.lineTypeCode=lineTypeCode;
       this.unitOfMeasurementCode=unitOfMeasurementCode;
       this.currencyCode=currencyCode;
       this.personnelNumberCode = personnelNumberCode; 
       this.serviceTypeCode=serviceTypeCode;
       this.materialGroupCode=materialGroupCode;
       this.formulaCode=formulaCode;

      this.selectionCheckbox=selectionCheckbox;
      this.lineIndex=lineIndex;
      this.deletionIndicator=deletionIndicator; 
      this.shortText=shortText;
      this.quantity=quantity;
      this.grossPrice=grossPrice;
      this.overFulfilmentPercentage=overFulfilmentPercentage;
      this.priceChangedAllowed=priceChangedAllowed;
      this.unlimitedOverFulfillment=unlimitedOverFulfillment;
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
      this.dontUseFormula=dontUseFormula;
    }
}