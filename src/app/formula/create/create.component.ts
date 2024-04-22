import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormulaService } from '../formula.service';
import { ApiService } from 'src/app/ApiService.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [FormulaService]
})
export class CreateComponent implements OnInit {

  createInformation: any;
  submitted: boolean = false;
  isNumberOfParametersValid = true;

  validateNumberOfParameters() {
    this.isNumberOfParametersValid = this.createInformation.numberOfParameters >= 0;
  }

  constructor(private apiService: ApiService,private router: Router, public formulaService: FormulaService,) { }

  ngOnInit() {
    this.createInformation = this.formulaService.getFormulaInformation().createInformation;
  }
  nextPage() {
    if (this.createInformation.formula && this.createInformation.description && this.createInformation.numberOfParameters 
      ) {
      this.formulaService.formulaInformation.createInformation = this.createInformation;
      const navigationExtras: NavigationExtras = {
        state: {
          numberOfParameters: this.createInformation.numberOfParameters,
          passedCreateInfo: this.createInformation
        }
      };
      this.router.navigate(['formula/parameter'], navigationExtras);
      return;
    }

    this.submitted = true;
  }
}
