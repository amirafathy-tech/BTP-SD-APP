import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';
import { AddModelComponent } from './model/add-model/add-model.component';
import { ServiceComponent } from './service/service.component';
import { ServiceTestComponent } from './service-test/service-test.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'model', component: ModelComponent },
  { path: 'modeladd', component: AddModelComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'serviceTest', component: ServiceTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
