import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormulaService } from '../formula.service';
import { ApiService } from 'src/app/ApiService.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [FormulaService, ApiService, MessageService, ConfirmationService]
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

  constructor(private router: Router, private route: ActivatedRoute, public formulaService: FormulaService,
    private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {
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
      console.log(this.testInformation.variables);
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
      // this.apiService.post<any>('formulas', formulaObject1).subscribe((response) => {
      //   console.log('formula created:', response.result);
      //   this.result = response.result
      //   //+this.resultUnitOfMeasurement.code;
      //   console.log(this.result);
      //   this.visible = true;
      // });
      this.apiService.post<any>('formulas', formulaObject1).subscribe(
        (response) => {
          console.log('formula created:', response.result);
          this.result = response.result;
          //+this.resultUnitOfMeasurement.code;
          console.log(this.result);
          this.visible = true;
        },
        (error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Code Conflict', detail: 'This Formula Code already exists', life: 10000 });
        }
      );
      // this.router.navigate(['formula/test'], navigationExtras);
      return;
    }
    this.submitted = true;
  }

  navigateAllFormulas() {
    console.log(this.result);
    if (this.result != 0) {
      this.confirmationService.confirm({
        message: 'Formula Created successfully. Click Accept to go to the Formulas Page.',
        header: 'Added Successfully',
        icon: 'pi pi-check',
        accept: () => {
          this.router.navigate(['/formulas']);
        },
        reject: () => {
        }
      });
    }
    else {
      const formulaObject1: any = {
        formula: this.passedCreateInfo.formula,
        description: this.passedCreateInfo.description,
        numberOfParameters: this.passedCreateInfo.numberOfParameters,
        parameterIds: this.parameterIds,
        parameterDescriptions: this.parameterDescriptions,
        formulaLogic: this.formulaLogic,
      };
      console.log(formulaObject1);
      this.apiService.post<any>('formulas', formulaObject1).subscribe((response) => {
        console.log('formula created:', response);
        this.result = response.result
        console.log(this.result);//Nan
        this.confirmationService.confirm({
          message: 'Formula Created successfully. Click Accept to go to the Formulas Page.',
          header: 'Added Successfully',
          icon: 'pi pi-check',
          accept: () => {
            this.router.navigate(['/formulas']);
          },
          reject: () => {
          }
        });
      });
    }
  }
}
