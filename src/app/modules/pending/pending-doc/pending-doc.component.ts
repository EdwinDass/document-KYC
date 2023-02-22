import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";;
import { MatPaginator } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';
import { HttpHeaders } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';



@Component({
  selector: 'app-pending-doc',
  templateUrl: './pending-doc.component.html',
  styleUrls: ['./pending-doc.component.scss']
})
export class PendingDocComponent implements OnInit {

  // dataSource = new MatTableDataSource();

  sum:number=0;
  
  
  dataSource= new MatTableDataSource();
  
  displayedColumns:string[] =[
    // "sl_no",
    "merchant_name",
    "gst_in",
    "kyc_doc_pending",
    "bus_doc_pending",
    "action",
    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private apiservice: ApiService,){}

  openKYC(element:any){
    const gst=element.gstin;
    const companyId = element.companyId;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gst: JSON.stringify(gst),
      },
    };


   

    this.router.navigate([`kyc_document/${companyId}`]);
        
  }

  ngOnInit(){
    this.getpendingdocument();
  }

  getpendingdocument() {
    
    
    this.apiservice.getPendingDocuments().subscribe((response: any) => {
     
      if (response.code == 200) {
      //   console.log("gvwvgeiugwe");
        const pendingDocuments = response.data ? response.data : [];
      
        this.dataSource = new MatTableDataSource(pendingDocuments)
        // console.log(response);

        this.dataSource.paginator= this.paginator;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "createdBy", direction: "desc" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        
      }
    })
  }

}
