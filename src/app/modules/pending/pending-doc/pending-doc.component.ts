import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";;
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


export interface h{
  hi?:string,
}

const e:h[]=[
  {hi:"hi"}
]
@Component({
  selector: 'app-pending-doc',
  templateUrl: './pending-doc.component.html',
  styleUrls: ['./pending-doc.component.scss']
})
export class PendingDocComponent {

  // dataSource = new MatTableDataSource();
  
  dataSource=e;
  
  displayedColumns:string[] =[
    "sl_no",
    "merchant_name",
    "gst_in",
    "kyc_doc_pending",
    "bus_doc_pending",
    "action",
    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router){}

  openKYC(){
    this.router.navigate(["kyc_document"])
        
  }

}
