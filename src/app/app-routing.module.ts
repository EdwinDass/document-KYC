import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedDocComponent } from './modules/approved/approved-doc/approved-doc.component';
import { DocDetailsComponent } from './modules/approved/doc-details/doc-details.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { LoginPageComponent } from './modules/login/login-page/login-page.component';
import { PendingDocComponent } from './modules/pending/pending-doc/pending-doc.component';

const routes: Routes = [
  { path: "", component: LoginPageComponent},
 
  { path: "login",component:LoginPageComponent},
  { path: "home", component: HomePageComponent },
  { path: "pending", component: PendingDocComponent },
  { path: "approved", component: ApprovedDocComponent },
  { path: "approved_document", component:DocDetailsComponent},

  // { path: "kyc_document", component: KycDocComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
