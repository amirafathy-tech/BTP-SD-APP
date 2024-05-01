import { Component, OnInit } from '@angular/core';
import { FormulaService } from '../formula.service';
import { NavigationExtras, Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure.model';
import { ApiService } from 'src/app/ApiService.service';
@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css'],
  providers: [FormulaService]
})
export class ParameterComponent implements OnInit {
  numberOfParameters!: number;
  formula!: string;
  description!: string;

  passedCreateInfo: any;
  passedParamInfo: any;
  parameterInformation: any;
  parameterInformationIterator: any[] = [];
  submitted: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, public formulaService: FormulaService,) {

    this.numberOfParameters = this.router.getCurrentNavigation()?.extras.state?.['numberOfParameters'];
    this.formula = this.router.getCurrentNavigation()?.extras.state?.['formula'];
    this.description = this.router.getCurrentNavigation()?.extras.state?.['description'];

    this.passedCreateInfo = this.router.getCurrentNavigation()?.extras.state?.['passedCreateInfo'];
    console.log(this.passedCreateInfo);
    console.log(this.numberOfParameters);

  }

  ngOnInit() {
           
    // if user press Back Button 
    if (JSON.parse(String(localStorage.getItem('passedParamInfo'))) !== null) {
      this.parameterInformation = JSON.parse(String(localStorage.getItem('passedParamInfo'))) ? JSON.parse(String(localStorage.getItem('passedParamInfo')))! : [];
      console.log(this.parameterInformation);
      for (let i = 0; i < Number(localStorage.getItem('numberOfParameters')); i++) {
        console.log(this.parameterInformation[i].paramID);
        console.log(this.parameterInformation[i].paramDescription);
        this.parameterInformationIterator.push({ paramID: this.parameterInformation[i].paramID, paramDescription: this.parameterInformation[i].paramDescription });
      }
      console.log(this.parameterInformationIterator);
    }
    else {
      this.parameterInformation = this.formulaService.getFormulaInformation().parameterInformation;
      for (let i = 0; i < this.numberOfParameters; i++) {
        this.parameterInformationIterator.push({ paramID: '', paramDescription: '' });
      }
    }
  }

  nextPage() {
    if (this.parameterInformationIterator.every(param => param.paramID && param.paramDescription)) {
      this.formulaService.formulaInformation.parameterInformation.parameters = this.parameterInformationIterator;
      console.log(this.formulaService.formulaInformation);

      // save parameters info in local storage 
      localStorage.setItem('passedParamInfo', JSON.stringify(this.parameterInformationIterator));

      const navigationExtras: NavigationExtras = {
        state: {
          passedCreateInfo: this.passedCreateInfo,
          passedParamInfo: this.parameterInformationIterator
        }
      };
      console.log(navigationExtras);
      this.router.navigate(['formula/relation'], navigationExtras);
      return;
    }
    this.submitted = true;
  }
  prevPage() {
    const navigationExtras: NavigationExtras = {
      state: {
        numberOfParameters: this.numberOfParameters,
        passedCreateInfo: this.passedCreateInfo,
        formula: this.formula,
        description: this.description
      }
    };
    console.log(navigationExtras);

    this.router.navigate(['formula/create'], navigationExtras);
    // return;
  }
}
