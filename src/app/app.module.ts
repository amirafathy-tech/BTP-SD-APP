

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



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModelComponent } from './model/model.component';
import { AddModelComponent } from './model/add-model/add-model.component';
import { ServiceComponent } from './service/service.component';
import { ServiceTestComponent } from './service-test/service-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModelComponent,
    AddModelComponent,
    ServiceComponent,
    ServiceTestComponent
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



    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
