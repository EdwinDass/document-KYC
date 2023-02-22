import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingDocComponent } from './pending-doc/pending-doc.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KycDocComponent } from './kyc-doc/kyc-doc.component';
import { BusinessDocComponent } from './business-doc/business-doc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from '@angular/material/card';
import {  ReactiveFormsModule } from '@angular/forms';
import { FilesDialogComponent } from './files-dialog/files-dialog.component';
// import { data } from '../pending-doc/pending-doc.component';



@NgModule({
  declarations: [
    PendingDocComponent,
    KycDocComponent,
    BusinessDocComponent,
    FilesDialogComponent,
  ],
  imports: [
    CommonModule,
    PendingRoutingModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  // exports:[
  //   data
  // ]
})
export class PendingModule { }
