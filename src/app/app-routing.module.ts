import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';
import { AddModelComponent } from './model/add-model/add-model.component';
import { ServiceComponent } from './service/service.component';
import { ServiceTestComponent } from './service-test/service-test.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { FormulaComponent } from './formula/formula.component';
import { CreateComponent } from './formula/create/create.component';
import { ParameterComponent } from './formula/parameter/parameter.component';
import { RelationComponent } from './formula/relation/relation.component';
import { TestComponent } from './formula/test/test.component';
import { ServiceMasterComponent } from './service-master/service-master.component';
import { ServiceMasterAddComponent } from './service-master/service-master-add/service-master-add.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'model', component: ModelComponent },
  { path: 'modeladd', component: AddModelComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'serviceTest', component: ServiceTestComponent },
  
  { path: 'servicetype', component: ServiceTypeComponent },
  
  { path: 'servicemaster', component: ServiceMasterComponent },
  { path: 'servicemaster-add', component: ServiceMasterAddComponent },
//   {
//     path: 'servicemaster', component: ServiceMasterComponent,
//     children: [
//       { path: '', component: ServiceMasterComponent },
//       { path: 'add', component: ServiceMasterAddComponent },
//     ]
// },
  {
    path: 'formula', component: FormulaComponent,
    children: [
      { path: '', component: CreateComponent },
        { path: 'create', component: CreateComponent },
        { path: 'parameter', component: ParameterComponent },
        { path: 'relation', component: RelationComponent },
        { path: 'test', component: TestComponent },
    ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
