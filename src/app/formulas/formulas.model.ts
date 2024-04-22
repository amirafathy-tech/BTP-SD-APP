export class Formula {
  public formulaCode!:number;
    public formula: string;
    public description: string;
   public result!: number
    constructor(formula:string,description: string
    ) {
        this.formula = formula;
      this.description=description;
    }
}