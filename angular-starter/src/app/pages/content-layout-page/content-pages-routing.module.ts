import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { VerifiedEmailPageComponent } from './verified-email/verified-email-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { ForgotPasswordConfirmPageComponent } from './forgot-password-confirm/forgot-password-page.component';
import { ChangePasswordPageComponent } from './change-password/change-password-page.component';
import { ThankyouEmailSendPageComponent } from './verified-email-send/verified-email-send-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register page'
        }
      },
      {
        path: 'emailverified',
        component: VerifiedEmailPageComponent,
        data: {
          title: 'Email Verified Page'
        }
      },
      {
        path: 'thankyouemail',
        component: ThankyouEmailSendPageComponent,
        data: {
          title: 'Email Verified Send Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordPageComponent,
        data: {
          title: 'Change Password Page'
        }
      },
      {
        path: 'reset/:uuid/:id',
        component: ForgotPasswordConfirmPageComponent,
        data: {
          title: 'Forgot Password Confirm Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
