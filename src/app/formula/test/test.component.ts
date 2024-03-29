import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormulaService } from '../formula.service';
import { ApiService } from 'src/app/ApiService.service';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [FormulaService, ApiService]
})
export class TestComponent implements OnInit {
  result: number = 0;
  visible: boolean = false;
  formulaObject: any = {
    formula: '',
    description: '',
    numberOfParameters: 0,
    parameterIds: [],
    parameterDescriptions: [],
    formulaLogic: '',
    testParameters: []
  };

  variableValues: number[] = [];
  parameterIds: string[] = [];
  parameterDescriptions: string[] = []

  testInformation: any;
  submitted: boolean = false;
  formulaLogic!: string;
  passedCreateInfo: any;
  passedParamInfo: any;
  passedTestInfo: any;
  // resultUnitOfMeasurement:any;

  constructor(private router: Router, private route: ActivatedRoute, public formulaService: FormulaService, private apiService: ApiService) {
    this.formulaLogic = this.router.getCurrentNavigation()?.extras.state?.['formulaLogic'];
    this.passedCreateInfo = this.router.getCurrentNavigation()?.extras.state?.['passedCreateInfo'];
    this.passedParamInfo = this.router.getCurrentNavigation()?.extras.state?.['passedParamInfo'];
    this.parameterIds = this.passedParamInfo.map((item: { paramID: any; }) => item.paramID);
    this.parameterDescriptions = this.passedParamInfo.map((item: { paramDescription: any; }) => item.paramDescription);

    console.log(this.parameterIds);
    console.log(this.parameterDescriptions);
    console.log(this.passedCreateInfo);
    console.log(this.passedParamInfo);
    console.log(this.formulaLogic);
  }
  ngOnInit() {
    this.testInformation = this.formulaService.getFormulaInformation().testInformation;
    console.log("heree");

    console.log(this.formulaService.formulaInformation);
    // this.apiService.getID<UnitOfMeasure>('measurements',this.passedCreateInfo.unitOfMeasurementCode).subscribe(response => {
    //   console.log(response);
    //   this.resultUnitOfMeasurement = response;
    //   console.log(this.resultUnitOfMeasurement);
    // });
  }

  getVariables(formulaLogic: string): string[] {
    //to extract variables from the formulaLogic string
    const regex = /[a-zA-Z]+/g;
    const variables = formulaLogic.match(regex);
    return variables ? variables : [];
  }
  prevPage() {
    this.router.navigate(['formula/relation']);
  }

  nextPage() {

    if (this.testInformation.variables) {
      const valuesOnly = Object.values(this.testInformation.variables)
        .filter(value => typeof value === 'number') as number[];
      console.log(valuesOnly);


      console.log(this.testInformation.variables);
      this.formulaService.formulaInformation.testInformation = this.testInformation;
      console.log(this.formulaService.formulaInformation);
      const navigationExtras: NavigationExtras = {
        state: {
          passedCreateInfo: this.passedCreateInfo,
          parameterIds: this.parameterIds,
          parameterDescriptions: this.parameterDescriptions,
          formulaLogic: this.formulaLogic,
          passedTestInfo: valuesOnly,
        }
      };
      console.log(navigationExtras);

      const formulaObject1: any = {
        formula: this.passedCreateInfo.formula,
        description: this.passedCreateInfo.description,
        numberOfParameters: this.passedCreateInfo.numberOfParameters,
    //  unitOfMeasurementCode: this.passedCreateInfo.unitOfMeasurementCode,
        parameterIds: this.parameterIds,
        parameterDescriptions: this.parameterDescriptions,
        formulaLogic: this.formulaLogic,
        testParameters: valuesOnly
      };

      console.log(formulaObject1);



      this.apiService.post<any>('formulas', formulaObject1).subscribe((response) => {
        console.log('formula created:', response.result);
        this.result = response.result
        //+this.resultUnitOfMeasurement.code;
        console.log(this.result);
        
        this.visible = true;
      });

      // this.router.navigate(['formula/test'], navigationExtras);

      return;
    }
    this.submitted = true;
  }
  showResult() {
    try {
      const result = eval(this.formulaLogic);
      console.log(result);

      // this.messageService.add({ severity: 'success', summary: 'Result', detail: `The result is: ${result}` });
    } catch (error) {
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid formula' });
    }
  }

  save() {
    console.log(this.formulaService.formulaInformation);
  }
}
