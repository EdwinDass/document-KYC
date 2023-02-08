import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-approved-doc',
  templateUrl: './approved-doc.component.html',
  styleUrls: ['./approved-doc.component.scss']
})
export class ApprovedDocComponent {

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

  openDoc(element:any){
    this.router.navigate(["approved_document"]);
        
  }

}
