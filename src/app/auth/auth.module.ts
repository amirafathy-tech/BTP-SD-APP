import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
    declarations: [AuthComponent],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    ],
    providers:[
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthInterceptorService,
            multi:true
          }
    ]
})
export class AuthModule {}