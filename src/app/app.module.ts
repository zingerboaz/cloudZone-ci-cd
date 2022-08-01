import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


import {FormsModule,ReactiveFormsModule} from'@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SaleComponent } from './components/sale/sale.component';
import { HomComponent } from './components/hom/hom.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignResultComponent } from './components/sign-result/sign-result.component';
import { SignUp1Component } from './components/sign-up1/sign-up1.component';
import { LoginComponent } from './components/login/login.component';
import { CodeComponent } from './components/code/code.component';
import { SignResult1Component } from './components/sign-result1/sign-result1.component';
import { SignResult2Component } from './components/sign-result2/sign-result2.component';
import { TestComponent } from './components/test/test.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { Login1Component } from './components/login1/login1.component';
import { PractisesComponent } from './components/practises/practises.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ManagerUsersComponent } from './components/manager-users/manager-users.component';
import { CreatTestComponent } from './components/creat-test/creat-test.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { UploadInternComponent } from './components/upload-intern/upload-intern.component';
import { ManagerUpdateTestComponent } from './components/manager-update-test/manager-update-test.component';
import {AuthGuardService} from './auth/auth-guard.service';
import { AnswerTestPageComponent } from './components/answer-test-page/answer-test-page.component';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';
import { SeeResultComponent } from './components/see-result/see-result.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminComponent } from './components/admin/admin.component'


@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    HomComponent,
    SignUpComponent,
    SignResultComponent,
    SignUp1Component,
    LoginComponent,
    CodeComponent,
    SignResult1Component,
    SignResult2Component,
    TestComponent,
    RegistrationComponent,
    Login1Component,
    PractisesComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    ManagerComponent,
    ManagerUsersComponent,
    CreatTestComponent,
    TestPageComponent,
    UploadInternComponent,
    ManagerUpdateTestComponent,
    AnswerTestPageComponent,
    ExamResultsComponent,
    SeeResultComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
