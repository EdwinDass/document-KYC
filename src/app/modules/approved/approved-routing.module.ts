import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedDocComponent } from './approved-doc/approved-doc.component';
import { DocDetailsComponent } from './doc-details/doc-details.component';

const routes: Routes = [

  { path: "approved", component: ApprovedDocComponent },
  { path: "document", component:DocDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedRoutingModule { }
