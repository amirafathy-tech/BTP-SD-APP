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


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'model',canActivate: [AuthGuard],data: { role: 'Admin' },component: ModelComponent },
  { path: 'add-model',canActivate: [AuthGuard], component: AddModelComponent },
  { path: 'modelSpecDetails',canActivate: [AuthGuard], component: ModelDetailsComponent },
  { path: 'servicetype',canActivate: [AuthGuard], component: ServiceTypeComponent },
  { path: 'servicemaster',canActivate: [AuthGuard], component: ServiceMasterComponent },
  { path: 'add-servicemaster',canActivate: [AuthGuard], component: ServiceMasterAddComponent },
  { path: 'detail-servicemaster',canActivate: [AuthGuard], component: ServiceMasterDetailComponent },
  { path: 'formulas',canActivate: [AuthGuard], component: FormulasComponent },
  { path: 'login', component: AuthComponent },
  //{ path: 'fs', component: FsComponent },

  {
    path: 'formula',canActivate: [AuthGuard], component: FormulaComponent,
    children: [
      { path: '',canActivate: [AuthGuard], component: CreateComponent },
        { path: 'create',canActivate: [AuthGuard], component: CreateComponent },
        { path: 'parameter',canActivate: [AuthGuard], component: ParameterComponent },
        { path: 'relation',canActivate: [AuthGuard], component: RelationComponent },
        { path: 'test',canActivate: [AuthGuard], component: TestComponent },
    ]
}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
