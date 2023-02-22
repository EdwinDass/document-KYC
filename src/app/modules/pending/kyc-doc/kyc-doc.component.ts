import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';
import { ApiService } from '../service/api/api.service';
 
export interface yes{
  name:string
}


@Component({
  selector: 'app-kyc-doc',
  templateUrl: './kyc-doc.component.html',
  styleUrls: ['./kyc-doc.component.scss']
})
export class KycDocComponent {

  name:any;
  KYCDetails:any;


  companyId!:string

  companyDetails!:any

  edwin: string="";
  

  form!: FormGroup;

  @Input() indicators = true;
  selectedIndex = 0;

  //status Flags
  aadhaarStatus=false;
  panStatus=false;
  mobileStatus=false;


  // photos: any = [
  //   "https://xuriti-prod-kyc.s3.ap-south-1.amazonaws.com/36AAGCG6803L1ZD/1674296893917-WhatsApp-Image-2023-01-02-at-5.56.23-PM.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230209%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230209T122642Z&X-Amz-Expires=900&X-Amz-Signature=edfa6d23400b92439a2d8a65a4741fea49ba02c9cea1ec54c14c09ba4706f84d&X-Amz-SignedHeaders=host",
  //   "https://xuriti-prod-kyc.s3.ap-south-1.amazonaws.com/36AAGCG6803L1ZD/1674296893938-WhatsApp-Image-2023-01-02-at-5.56.24-PM.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230209%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230209T122642Z&X-Amz-Expires=900&X-Amz-Signature=bea9b9a0c1ffd0b0a3728f3e9d7fcb8a84de48e0a39e8fe45e0b167cfaaaef7f&X-Amz-SignedHeaders=host"
  // ]

  // Non Editable field for document type
  editable: boolean = false;

  //aadhaar proof flag
  aadhaarFlagDone: boolean | undefined;
  aadhaarFlagCancel: boolean | undefined;

  //pan proof flag
  panFlagDone: boolean | undefined
  panFlagCancel: boolean | undefined

  //mobile proof flag
  mobileFlagDone: boolean | undefined
  mobileFlagCancel: boolean | undefined

 
 


  //dynamic comments array list
  aadhaarCommentsList: any = [];
  panCommentsList: any = [];
  mobileCommentsList: any = [];

 
  
    // constructor(  ) {}

  constructor(private router: Router, private fb: FormBuilder, private apiservice: ApiService, private route: ActivatedRoute,
    private dialog: MatDialog 
     ) { }

  
  ngOnInit() {


    this.route.params.subscribe((params) => {
      this.companyId = params.id
    });

    this.getspecifiedcompanydetails();
    this. getkycdocument();


    
  this.reset();


    this.form = this.fb.group({
      aadhar_proof: [""],
      pan_proof: [""],
      contact: [""]
    });

    // this.getkycdocument();



  }

  getspecifiedcompanydetails(){
    this.apiservice.getSpecifiedCompanyDetails(this.companyId).subscribe((response:any)=>{
      if(response.status==true)
      {
       this.companyDetails= response.company;
      }
    })
  }

  openDialog(files:any ):void{
    console.log(files);
    // const dialogRef =
     this.dialog.open(FilesDialogComponent,{height: '500px',
     width: '900px',
     data:{files:files}});

    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
   
  }

  goKyc() {
    console.log(this.companyId);
    // this.router.navigate([`business_document/${this.companyId}`])
  }

  getkycdocument(){
    this.apiservice.getKycDocument(this.companyId).subscribe((response:any)=>{
      if(response.status==true){
        const kycDocument = response.data? response.data : [];

        this.KYCDetails=kycDocument;
        console.log(this.KYCDetails.aadhar.files[0]);
      }
    })
    // console.log(this.KYCDetails)
  }



  doneFlagAadhaar() {
    //Aadhaar proof done flag
    this.form.controls['aadhar_proof'].setValue("");
    if (this.aadhaarFlagCancel) {
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
    } else {
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
    }
    if (this.aadhaarFlagDone) {
      this.form.get('aadhar_proof')?.setValidators([Validators.required]);
      this.aadhaarCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else{
      this.form.get('aadhar_proof')?.clearValidators();
      this.aadhaarCommentsList = [];
    }


  }

  cancelFlagAadhaar() {
    //Aadhaar proof cancel flag
    this.form.controls['aadhar_proof'].setValue("");
    if (this.aadhaarFlagDone) {
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
    } else {
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
    }
    if (this.aadhaarFlagCancel) {
      this.form.get('aadhar_proof')?.setValidators([Validators.required]);
      this.aadhaarCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.form.get('aadhar_proof')?.clearValidators();
      this.aadhaarCommentsList = []

    }


  }

  doneFlagPan() {
    //PAN Proof done flag
    this.form.controls['pan_proof'].setValue("");
    if (this.panFlagCancel) {
      this.panFlagCancel = !this.panFlagCancel;
      this.panFlagDone = !this.panFlagDone;
    } else {
      this.panFlagDone = !this.panFlagDone;
    }
    if (this.panFlagDone) {
      this.form.get('pan_proof')?.setValidators([Validators.required]);
      this.panCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.form.get('pan_proof')?.clearValidators();
      this.panCommentsList = [];
    }

  }

  
  cancelFlagPan() {
    //PAN Proof cancel flag
    this.form.controls['pan_proof'].setValue("");
    if (this.panFlagDone) {
      this.panFlagDone = !this.panFlagDone;
      this.panFlagCancel = !this.panFlagCancel;
    } else {
      this.panFlagCancel = !this.panFlagCancel;
    }
    if (this.panFlagCancel) {
      this.form.get('pan_proof')?.setValidators([Validators.required]);
      this.panCommentsList = ["not matching", "duplicate", "completely blur"];
    } else{
      this.form.get('pan_proof')?.clearValidators();
      this.panCommentsList = [];

    }
  }


  doneFlagMobile() {
    //mobile Proof done flag
    this.form.controls['contact'].setValue("");
    if (this.mobileFlagCancel) {
      this.mobileFlagCancel = !this.mobileFlagCancel;
      this.mobileFlagDone = !this.mobileFlagDone;
    } else {
      this.mobileFlagDone = !this.mobileFlagDone;
    }
    if (this.mobileFlagDone) {
      this.form.get('contact')?.setValidators([Validators.required]);
      this.mobileCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else{
      this.form.get('contact')?.clearValidators();
      this.mobileCommentsList = [];
    }

  }

  cancelFlagMobile() {
    //mobile Proof cancel flag
    this.form.controls['contact'].setValue("");
    if (this.mobileFlagDone) {
      this.mobileFlagDone = !this.mobileFlagDone;
      this.mobileFlagCancel = !this.mobileFlagCancel;
    } else {
      this.mobileFlagCancel = !this.mobileFlagCancel;
    }
    if (this.mobileFlagCancel) {
     
      this.form.get('contact')?.setValidators([Validators.required]);
      this.mobileCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.form.get('contact')?.clearValidators();
      this.mobileCommentsList = [];
    }

  }




  selectImage(index: number): void {
    this.selectedIndex = index;
  }


  goback() {
    this.router.navigate(["pending"]);
  }

  openBusDoc() {
    this.router.navigate([`business_document/${this.companyId}`]);
  }

  reset(){
    this.aadhaarFlagDone=false;
    this.aadhaarFlagCancel=false;
  
    //pan proof flag
    this.panFlagDone=false;
    this.panFlagCancel=false;  
    //mobile proof flag
    this.mobileFlagDone=false;
    this.mobileFlagCancel=false;
  
  
    //dynamic comments array list
    this.aadhaarCommentsList= [];
    this.panCommentsList = [];
    this.mobileCommentsList = [];

  }

  onSubmit() { 
   
    

    let body:any={};

    

    body["gstin"]=this.companyDetails.gstin;
   




    if (this.aadhaarFlagDone || this.aadhaarFlagCancel) {
      if (this.form.value.aadhar_proof != "") {
        let comment= this.form.value.aadhar_proof
        let status="";
        if(this.aadhaarFlagDone){
          status="Approved"
        }else if(this.aadhaarFlagCancel){
           status="Rejected"
        }else{
           status="In-Progress"
        }
       

        body["aadharDetails"]={
           "comment": comment,
           "status" : status
          }
        } else {
          alert("Please Fill Aadhaar Details");
        }
        
     
    }
    



    if (this.panFlagDone || this.panFlagCancel) {
      if (this.form.value.pan_proof != "") {
        let comment= this.form.value.pan_proof;
        let status="";
        if(this.panFlagDone){
          status="Approved"
        }else if(this.panFlagCancel){
           status="Rejected"
        }else{
           status="In-Progress"
        }
      

        body["panDetails"]={
           "comment": comment,
           "status" : status
          }
      
      

      } else {
        alert("Please Fill Pan Details");
      }
    }




    if (this.mobileFlagDone || this.mobileFlagCancel) {
      if (this.form.value.contact != "") {
        let comment=this.form.value.contact;
        let status="";
        if(this.mobileFlagDone){
          status="Approved"
        }else if(this.mobileFlagCancel){
           status="Rejected"
        }else{
           status="In-Progress"
        }

        body["phoneDetails"]={
           "comment": comment,
           "status" : status
          }
        } else {
          alert("Please Fill Mobile Details");
        }
      }
      


  this.apiservice.setStatusForDocument(this.companyId,body).subscribe((res:any)=>{
    console.log("Status submitted",body,res)
    alert("KYC Document is Submitted")
    this.ngOnInit();
  })
 
  }
  


 
}



