import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-kyc-doc',
  templateUrl: './kyc-doc.component.html',
  styleUrls: ['./kyc-doc.component.scss']
})
export class KycDocComponent {

  form!: FormGroup;

  @Input() indicators = true;
  selectedIndex = 0;

  //status Flags
  aadhaarStatus=false;
  panStatus=false;
  mobileStatus=false;


  photos: any = [
    `data:image/jpeg;base64,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`,
    `data:image/jpeg;base64,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`
  ]

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

  // //required message Flags
  // aadhaarSubmit = false;
  // panSubmit = false;
  // mobileSubmit = false;

  //display message flag
  //  displayFlag=false;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    //aadhaar proof flag
    this.aadhaarFlagDone = false;
    this.aadhaarFlagCancel = false;

    //pan proof flag
    this.panFlagDone = false
    this.panFlagCancel = false

    //mobile proof flag
    this.mobileFlagDone = false
    this.mobileFlagCancel = false


    this.form = this.fb.group({
      aadhar_proof: [""],
      pan_proof: [""],
      contact: [""]
    });



  }

  goKyc() {
    this.router.navigate(["kyc_document"])
  }



  doneFlagAadhaar() {
    //Aadhaar proof done flag
    if (this.aadhaarFlagCancel) {
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
      this.form = this.fb.group({
        aadhar_proof: [""],
      });
    } else {
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
    }
    if (this.aadhaarFlagDone) {
      this.aadhaarCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.aadhaarCommentsList = [];
    }


  }

  cancelFlagAadhaar() {
    //Aadhaar proof cancel flag
    if (this.aadhaarFlagDone) {
      this.aadhaarFlagDone = !this.aadhaarFlagDone;
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
      this.form = this.fb.group({
        aadhar_proof: [""],
      });
    } else {
      this.aadhaarFlagCancel = !this.aadhaarFlagCancel;
    }
    if (this.aadhaarFlagCancel) {
      this.aadhaarCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.aadhaarCommentsList = []

    }


  }

  doneFlagPan() {
    //PAN Proof done flag
    if (this.panFlagCancel) {
      this.panFlagCancel = !this.panFlagCancel;
      this.panFlagDone = !this.panFlagDone;
      this.form = this.fb.group({
        pan_proof: [""],
      });
    } else {
      this.panFlagDone = !this.panFlagDone;
    }
    if (this.panFlagDone) {
      this.panCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.panCommentsList = [];
    }

  }

  cancelFlagPan() {
    //PAN Proof cancel flag
    if (this.panFlagDone) {
      this.panFlagDone = !this.panFlagDone;
      this.panFlagCancel = !this.panFlagCancel;
      this.form = this.fb.group({
        pan_proof: [""],
      });
    } else {
      this.panFlagCancel = !this.panFlagCancel;
    }
    if (this.panFlagCancel) {
      this.panCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.panCommentsList = [];

    }
  }


  doneFlagMobile() {
    //mobile Proof done flag
    if (this.mobileFlagCancel) {
      this.mobileFlagCancel = !this.mobileFlagCancel;
      this.mobileFlagDone = !this.mobileFlagDone;
      this.form = this.fb.group({
        contact: [""],
      });
    } else {
      this.mobileFlagDone = !this.mobileFlagDone;
    }
    if (this.mobileFlagDone) {
      this.mobileCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.mobileCommentsList = [];
    }

  }

  cancelFlagMobile() {
    //mobile Proof cancel flag
    if (this.mobileFlagDone) {
      this.mobileFlagDone = !this.mobileFlagDone;
      this.mobileFlagCancel = !this.mobileFlagCancel;
      this.form = this.fb.group({
        contact: [""],
      });
    } else {
      this.mobileFlagCancel = !this.mobileFlagCancel;
    }
    if (this.mobileFlagCancel) {
      this.mobileCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
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
    this.router.navigate(["business_document"]);
  }

  onSubmit() {
    const formData = new FormData;


    if (this.aadhaarFlagDone || this.aadhaarFlagCancel) {
      if (this.form.value.aadhar_proof != "") {
        formData.append("Aadhaar_Details", this.form.value.aadhar_proof);
        formData.forEach((r) => console.log(r));
        alert("aadhaar is Submitted")
        this.aadhaarFlagDone = false;
        this.aadhaarFlagCancel = false;
        this.aadhaarCommentsList = [];
        this.aadhaarStatus=true;
        // this.displayFlag=true;
      } else {
        alert("Please Fill Aadhaar Details");
      }
    }

  



    if (this.panFlagDone || this.panFlagCancel) {
      if (this.form.value.pan_proof != "") {
        formData.append("PAN_Details", this.form.value.pan_proof);
        formData.forEach((r) => console.log(r));
        alert("PAN is Submitted");
        this.panFlagDone = false;
        this.panFlagCancel = false;
        this.panCommentsList = [];
        this.panStatus=true;

      } else {
        alert("Please Fill PAN Details");
      }
    }




    if (this.mobileFlagDone || this.mobileFlagCancel) {
      if (this.form.value.contact != "") {
        formData.append("Mobile_Details", this.form.value.contact);
        formData.forEach((r) => console.log(r));
        alert("Mobile Details is Submitted")
        this.mobileFlagDone = false
        this.mobileFlagCancel = false
        this.mobileCommentsList = []
        this.mobileStatus=true;
      } else {
        alert("Please Fill Mobile Details");
      }
    }
  }

}