import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeComponent } from './components/code/code.component';
import { HomComponent } from './components/hom/hom.component';
import { Login1Component } from './components/login1/login1.component';
import { ManagerComponent } from './components/manager/manager.component';
import { PractisesComponent } from './components/practises/practises.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignResultComponent } from './components/sign-result/sign-result.component';
import { SignResult1Component } from './components/sign-result1/sign-result1.component';
import { SignResult2Component } from './components/sign-result2/sign-result2.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { TestComponent } from './components/test/test.component';
import { CanActivate } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { AnswerTestPageComponent } from './components/answer-test-page/answer-test-page.component';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';




const routes: Routes = [ 
  {path:'',component:HomComponent}, 
  {path:'sign-up',component:SignUpComponent},
  {path:'app-registration',component:RegistrationComponent},
  {path:'sign-result',component:SignResultComponent},
  {path:'app-code',component:CodeComponent},
  {path:'app-sign-result1',component:SignResult1Component},
  {path:'app-sign-result2',component:SignResult2Component},
  {path:'app-test',component:TestComponent},
  {path:'app-login1',component:Login1Component},
  {path:'app-manager',component:ManagerComponent, canActivate: [AuthGuard]},
  {path:'app-practises',component:PractisesComponent, canActivate: [AuthGuard]},
  {path:'test-page',component:TestPageComponent},
  {path:'app-answer-test-page',component:AnswerTestPageComponent},
  {path:'app-exam-results',component:ExamResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
