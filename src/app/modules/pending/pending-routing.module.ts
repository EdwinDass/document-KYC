import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDocComponent } from './business-doc/business-doc.component';
import { KycDocComponent } from './kyc-doc/kyc-doc.component';
import { PendingDocComponent } from './pending-doc/pending-doc.component';

const routes: Routes = [
  { path: "pending", component: PendingDocComponent },
  { path: "kyc_document", component: KycDocComponent },
  { path: "business_document", component: BusinessDocComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRoutingModule { }
