import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';
import { AddModelComponent } from './model/add-model/add-model.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { FormulaComponent } from './formula/formula.component';
import { CreateComponent } from './formula/create/create.component';
import { ParameterComponent } from './formula/parameter/parameter.component';
import { RelationComponent } from './formula/relation/relation.component';
import { TestComponent } from './formula/test/test.component';
import { ServiceMasterComponent } from './service-master/service-master.component';
import { ServiceMasterAddComponent } from './service-master/service-master-add/service-master-add.component';
import { FormulasComponent } from './formulas/formulas.component';
import { ServiceMasterDetailComponent } from './service-master/service-master-detail/service-master-detail.component';
import { FsComponent } from './fs/fs.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'model',component: ModelComponent },
  //{ path: 'model',data: { role: 'Admin' },component: ModelComponent },
  { path: 'add-model', component: AddModelComponent },
  { path: 'modelSpecDetails', component: ModelDetailsComponent },
  { path: 'servicetype', component: ServiceTypeComponent },
  { path: 'servicemaster', component: ServiceMasterComponent },
  { path: 'add-servicemaster', component: ServiceMasterAddComponent },
  { path: 'detail-servicemaster', component: ServiceMasterDetailComponent },
  { path: 'formulas', component: FormulasComponent },
  { path: 'login', component: AuthComponent },
  { path: 'invoice', component: InvoiceComponent },

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
