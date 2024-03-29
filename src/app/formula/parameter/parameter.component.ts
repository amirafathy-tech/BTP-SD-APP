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
  passedCreateInfo: any;
  passedParamInfo: any;

  parameterInformation: any;
  parameterInformationIterator: any[] = [];

  // recordsUnitOfMeasure!: UnitOfMeasure[];
  // selectedUnitOfMeasure!: number;

  submitted: boolean = false;

  constructor(private apiService: ApiService,private router: Router, private route: ActivatedRoute, public formulaService: FormulaService,) {
    this.numberOfParameters = this.router.getCurrentNavigation()?.extras.state?.['numberOfParameters'];

    this.passedCreateInfo = this.router.getCurrentNavigation()?.extras.state?.['passedCreateInfo'];
    console.log(this.passedCreateInfo);
    console.log(this.numberOfParameters);
  }

  ngOnInit() {
    this.parameterInformation = this.formulaService.getFormulaInformation().parameterInformation;
    for (let i = 0; i < this.numberOfParameters; i++) {
      this.parameterInformationIterator.push({ paramID: '', paramDescription: '' });

    }
    // this.apiService.get<UnitOfMeasure[]>('measurements').subscribe(response => {
    //   console.log(response);
    //   this.recordsUnitOfMeasure = response;
    //   console.log(this.recordsUnitOfMeasure);
    // });
  }

  nextPage() {
    if (this.parameterInformationIterator.every(param => param.paramID && param.paramDescription)) {
      this.formulaService.formulaInformation.parameterInformation.parameters = this.parameterInformationIterator;
      console.log(this.formulaService.formulaInformation);

      const navigationExtras: NavigationExtras = {
        state: {
          passedCreateInfo: this.passedCreateInfo,
          passedParamInfo: this.parameterInformationIterator
        }
      };

      this.router.navigate(['formula/relation'], navigationExtras);

      return;
    }


    this.submitted = true;
  }
  prevPage() {
    this.router.navigate(['formula/create']);
  }
}
