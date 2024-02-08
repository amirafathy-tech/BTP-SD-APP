import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormulaService } from '../formula.service';

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

  operations:string[]=['+','-','*','/','%','π','^']

  constructor(private router: Router, private route: ActivatedRoute, public formulaService: FormulaService,) {
    this.passedCreateInfo = this.router.getCurrentNavigation()?.extras.state?.['passedCreateInfo'];
    this.passedParamInfo = this.router.getCurrentNavigation()?.extras.state?.['passedParamInfo'];
    console.log(this.passedCreateInfo);
    console.log(this.passedParamInfo);

  }

  paramClick(param:string){
    this.relationInformation.formulaLogic +=param;
    console.log(this.relationInformation.formulaLogic);
    
    console.log(param);
    
  }
  operationClick(operation:string){
    this.relationInformation.formulaLogic +=operation;
    console.log(this.relationInformation.formulaLogic);
    
    console.log(operation);
    
  }
  ngOnInit() {
    this.relationInformation = this.formulaService.getFormulaInformation().relationInformation;
  }

  nextPage() {
    if (this.relationInformation.formulaLogic) {
      this.formulaService.formulaInformation.relationInformation = this.relationInformation;
      console.log(this.formulaService.formulaInformation);
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
    this.router.navigate(['formula/parameter']);
  }
}
