import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedRoutingModule } from './approved-routing.module';
import { ApprovedDocComponent } from './approved-doc/approved-doc.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DocDetailsComponent } from './doc-details/doc-details.component';


@NgModule({
  declarations: [
    ApprovedDocComponent,
    DocDetailsComponent
  ],
  imports: [
    CommonModule,
    ApprovedRoutingModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class ApprovedModule { }
