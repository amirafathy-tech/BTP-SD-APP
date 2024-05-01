import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormulaService } from '../formula.service';
import { ApiService } from 'src/app/ApiService.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css'],
  providers: [FormulaService]
})
export class RelationComponent implements OnInit {
  passedCreateInfo: any;
  passedParamInfo: any;
  relationInformation: any;
  submitted: boolean = false;
  parameterIds: string[] = [];
  parameterDescriptions: string[] = []
  operations: string[] = ['+', '-', '*', '/', '%', 'π', '^']

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, public formulaService: FormulaService,) {
    // this.passedCreateInfo = this.router.getCurrentNavigation()?.extras.state?.['passedCreateInfo'];
    // this.passedParamInfo = this.router.getCurrentNavigation()?.extras.state?.['passedParamInfo'];
    // console.log(this.passedCreateInfo);
    // console.log(this.passedParamInfo);

    // this.parameterIds = this.passedParamInfo.map((item: { paramID: any; }) => item.paramID);
    // this.parameterDescriptions = this.passedParamInfo.map((item: { paramDescription: any; }) => item.paramDescription);
    // console.log(this.parameterIds);
    // console.log(this.parameterDescriptions);
  }

  paramClick(param: string) {
    this.relationInformation.formulaLogic += param;
    console.log(this.relationInformation.formulaLogic);
    console.log(param);
  }
  operationClick(operation: string) {
    this.relationInformation.formulaLogic += operation;
    console.log(this.relationInformation.formulaLogic);
    console.log(operation);
  }

  ngOnInit() {

    // hold data from previous page:
    this.passedCreateInfo = history.state.passedCreateInfo;
    this.passedParamInfo = history.state.passedParamInfo;
    console.log(this.passedCreateInfo);
    console.log(this.passedParamInfo);

    this.parameterIds = this.passedParamInfo.map((item: { paramID: any; }) => item.paramID);
    this.parameterDescriptions = this.passedParamInfo.map((item: { paramDescription: any; }) => item.paramDescription);
    console.log(this.parameterIds);
    console.log(this.parameterDescriptions);

    // if user press Back Button 
    if (localStorage.getItem('formulaLogic') !== null) {
      console.log(localStorage.getItem('formulaLogic'));

      this.relationInformation = this.formulaService.getFormulaInformation().relationInformation;
      console.log(this.relationInformation);

      this.relationInformation.formulaLogic = localStorage.getItem('formulaLogic');
      console.log(this.relationInformation.formulaLogic);
    }
    else {
      this.relationInformation = this.formulaService.getFormulaInformation().relationInformation;
    }
  }

  nextPage() {
    if (this.relationInformation.formulaLogic) {
      console.log(this.relationInformation);
      console.log(this.relationInformation.formulaLogic);
      // Replace 'π' with '22/7'
      this.relationInformation.formulaLogic = this.relationInformation.formulaLogic.replace(/π/g, '22/7');
      // Replace '^' with '**'
      this.relationInformation.formulaLogic = this.relationInformation.formulaLogic.replace(/\^/g, '**');
      console.log(this.relationInformation.formulaLogic);
      this.formulaService.formulaInformation.relationInformation = this.relationInformation;
      console.log(this.formulaService.formulaInformation);
      console.log(this.formulaService.formulaInformation.relationInformation);

// save relation info in local storage 
      localStorage.setItem('formulaLogic', String(this.relationInformation.formulaLogic));

      const navigationExtras: NavigationExtras = {
        state: {
          formulaLogic: this.relationInformation.formulaLogic,
          passedCreateInfo: this.passedCreateInfo,
          passedParamInfo: this.passedParamInfo
        }
      };
      this.router.navigate(['formula/test'], navigationExtras);
      return;
    }
    this.submitted = true;
  }

  prevPage() {
    const navigationExtras: NavigationExtras = {
      state: {
        passedParamInfo: this.passedParamInfo
      }
    };
    console.log(navigationExtras);

    this.router.navigate(['formula/parameter'], navigationExtras);

  }
}
