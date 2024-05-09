
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';


import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
// import { InputGroupModule } from 'primeng';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModelComponent } from './model/model.component';
import { AddModelComponent } from './model/add-model/add-model.component';
import { ServiceComponent } from './service/service.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModelComponent,
    AddModelComponent,
    ServiceComponent,
    ModelDetailsComponent,
    ServiceTypeComponent,
    FormulaComponent,
    CreateComponent,
    ParameterComponent,
    RelationComponent,
    TestComponent,
    ServiceMasterComponent,
    ServiceMasterAddComponent,
    FormulasComponent,
    ServiceMasterDetailComponent,
  ],
  imports: [
    FundamentalNgxCoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,




    ButtonModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ToolbarModule,
    InputTextareaModule,
    MessagesModule,
    ToastModule,
    StepsModule,
    AnimateModule,
    CardModule,
    ChipModule,
    ConfirmDialogModule,
    PaginatorModule,
    MultiSelectModule,
    CheckboxModule,
    FieldsetModule,
    // InputGroupModule,
    // InputGroupAddonModule,


    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
