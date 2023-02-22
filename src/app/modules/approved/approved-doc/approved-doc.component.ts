import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from '../service/api/api.service';
import { MatTableDataSource } from '@angular/material/table';


// export interface h{
//   hi?:string,
// }

// const e:h[]=[
//   {hi:"hi"}
// ]


@Component({
  selector: 'app-approved-doc',
  templateUrl: './approved-doc.component.html',
  styleUrls: ['./approved-doc.component.scss']
})
export class ApprovedDocComponent implements OnInit {

  buzdetails:any

  dataSource= new MatTableDataSource;
  
  displayedColumns:string[] =[
    // "sl_no",
    "merchant_name",
    "gst_in",
    "kyc_doc_pending",
    "bus_doc_pending",
    // "action",
    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private apiservice: ApiService){}

  openDoc(element:any){
    this.router.navigate(["approved_document"]);
        
  }
  ngOnInit(){

    this.get_approved_details();

  }

  get_approved_details(){

    this.apiservice.getApprovedDocuments().subscribe((response:any)=>{
      console.log(response)
      if(response.status==true && response.code==200){
        const ApprovedData = response.data;

        this.buzdetails=ApprovedData;

        this.dataSource= new MatTableDataSource(ApprovedData)
        
      }
    })

  }

}
