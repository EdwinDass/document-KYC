import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-business-doc',
  templateUrl: './business-doc.component.html',
  styleUrls: ['./business-doc.component.scss']
})
export class BusinessDocComponent implements OnInit {



  @Input() indicators = true;
  selectedIndex = 0;



  photos: any = [
    `data:image/jpeg;base64,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`,
    `https://chandigarhmetro.com/wp-content/uploads/2020/02/how-to-create-perfect-image.jpg`
  ]

  editable: boolean = false;

  //business proof flag
  businessFlagDone = false;
  businessFlagCancel = false;

  //ownership proof flag
  ownershipFlagDone = false
  ownershipFlagCancel = false

  //Vintage proof flag
  vintageFlagDone = false
  vintageFlagCancel = false

  //Patnership proof flag
  FirmFlagDone = false
  FirmFlagCancel = false

  //Banking Details flag
  bankingFlagDone = false
  bankingFlagCancel = false

  // Financial & GST Returns flag
  gstFlagCancel = false;
  gstFlagDone = false;

  // Upload flag

  imagesFlagDone = false;
  imagesFlagCancel = false;

  //dynamic comments array list

  businessCommentsList: any = [];
  ownershipCommentsList: any = [];
  vintageCommentsList: any = [];
  firmCommentsList: any = [];
  bankingCommentsList: any = [];
  gstCommentsList: any = [];
  imagesCommentsList: any = [];


  form!: FormGroup;




  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      business_proof: [""],
      ownership_proof: [""],
      vintage_proof: [""],
      firm_details: [""],
      banking_details: [""],
      gst_details: [""],
      images: [""]
    })
  }

  goKyc() {
    this.router.navigate(["kyc_document"])
  }



  doneFlagBusiness() {
    //business proof done flag
    if (this.businessFlagCancel) {
      this.businessFlagCancel = !this.businessFlagCancel;
      this.businessFlagDone = !this.businessFlagDone;
      this.form = this.fb.group({
        business_proof: [""],
      })

    } else {
      this.businessFlagDone = !this.businessFlagDone;
    }
    if (this.businessFlagDone) {
      this.businessCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.businessCommentsList = []
    }

  }

  cancelFlagBusiness() {
    //business proof cancel flag
    if (this.businessFlagDone) {
      this.businessFlagDone = !this.businessFlagDone;
      this.businessFlagCancel = !this.businessFlagCancel;
      this.form = this.fb.group({
        business_proof: [""],
      })
    } else {
      this.businessFlagCancel = !this.businessFlagCancel;
    }
    if (this.businessFlagCancel) {
      this.businessCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.businessCommentsList = []
    }

  }

  doneFlagOwnership() {
    //ownership Proof done flag
    if (this.ownershipFlagCancel) {
      this.ownershipFlagCancel = !this.ownershipFlagCancel;
      this.ownershipFlagDone = !this.ownershipFlagDone;
      this.form = this.fb.group({
        ownership_proof: [""]
      })
    } else {
      this.ownershipFlagDone = !this.ownershipFlagDone;
    }
    if (this.ownershipFlagDone) {
      this.ownershipCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.ownershipCommentsList = []
    }

  }

  cancelFlagOwnership() {
    //ownership Proof cancel flag
    if (this.ownershipFlagDone) {
      this.ownershipFlagDone = !this.ownershipFlagDone;
      this.ownershipFlagCancel = !this.ownershipFlagCancel;
      this.form = this.fb.group({
        ownership_proof: [""]
      })
    } else {
      this.ownershipFlagCancel = !this.ownershipFlagCancel;
    }
    if (this.ownershipFlagCancel) {
      this.ownershipCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.ownershipCommentsList = []
    }
  }


  doneFlagVintage() {
    //vintage Proof done flag
    if (this.vintageFlagCancel) {
      this.vintageFlagCancel = !this.vintageFlagCancel;
      this.vintageFlagDone = !this.vintageFlagDone;
      this.form = this.fb.group({
        vintage_proof: [""]
      })
    } else {
      this.vintageFlagDone = !this.vintageFlagDone;
    }
    if (this.vintageFlagDone) {
      this.vintageCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.vintageCommentsList = [];
    }

  }

  cancelFlagVintage() {
    //vintage Proof cancel flag
    if (this.vintageFlagDone) {
      this.vintageFlagDone = !this.vintageFlagDone;
      this.vintageFlagCancel = !this.vintageFlagCancel;
      this.form = this.fb.group({
        vintage_proof: [""]
      })
    } else {
      this.vintageFlagCancel = !this.vintageFlagCancel;
    }
    if (this.vintageFlagCancel) {
      this.vintageCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.vintageCommentsList = []
    }

  }


  doneFlagPatnership() {
    //Patnership proof done flag
    if (this.FirmFlagCancel) {
      this.FirmFlagCancel = !this.FirmFlagCancel;
      this.FirmFlagDone = !this.FirmFlagDone;
      this.form = this.fb.group({
        firm_details: [""]
      })
    } else {
      this.FirmFlagDone = !this.FirmFlagDone;
    }
    if (this.FirmFlagDone) {
      this.firmCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.firmCommentsList = []
    }

  }

  cancelFlagPatnership() {
    //Patnership proof cancel flag
    if (this.FirmFlagDone) {
      this.FirmFlagDone = !this.FirmFlagDone;
      this.FirmFlagCancel = !this.FirmFlagCancel;
      this.form = this.fb.group({
        firm_details: [""]
      })
    } else {
      this.FirmFlagCancel = !this.FirmFlagCancel;
    }
    if (this.FirmFlagCancel) {
      this.firmCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.firmCommentsList = []
    }
  }


  doneFlagBanking() {
    // Banking Details done flag
    if (this.bankingFlagCancel) {
      this.bankingFlagCancel = !this.bankingFlagCancel;
      this.bankingFlagDone = !this.bankingFlagDone;
      this.form = this.fb.group({
        banking_details: [""]
      })
    } else {
      this.bankingFlagDone = !this.bankingFlagDone;
    }
    if (this.bankingFlagDone) {
      this.bankingCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.bankingCommentsList = []
    }
  }

  cancelFlagBanking() {
    //Banking Details cancel flag
    if (this.bankingFlagDone) {
      this.bankingFlagDone = !this.bankingFlagDone;
      this.bankingFlagCancel = !this.bankingFlagCancel;
      this.form = this.fb.group({
        banking_details: [""]
      })
    } else {
      this.bankingFlagCancel = !this.bankingFlagCancel;
    }
    if (this.bankingFlagCancel) {
      this.bankingCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.bankingCommentsList = []
    }
  }

  doneFlagGST() {
    //Financial & GST Returns done flag
    if (this.gstFlagCancel) {
      this.gstFlagCancel = !this.gstFlagCancel;
      this.gstFlagDone = !this.gstFlagDone;
      this.form = this.fb.group({
        gst_details: [""],
      })
    } else {
      this.gstFlagDone = !this.gstFlagDone;
    }
    if (this.gstFlagDone) {
      this.gstCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.gstCommentsList = []
    }
  }

  cancelFlagGST() {
    //Financial & GST Returns cancel flag
    if (this.gstFlagDone) {
      this.gstFlagDone = !this.gstFlagDone;
      this.gstFlagCancel = !this.gstFlagCancel;
      this.form = this.fb.group({
        gst_details: [""],
      })
    } else {
      this.gstFlagCancel = !this.gstFlagCancel;
    }
    if (this.gstFlagCancel) {
      this.gstCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.gstCommentsList = []
    }
  }

  doneFlagImage() {
    //Upload done flag
    if (this.imagesFlagCancel) {
      this.imagesFlagCancel = !this.imagesFlagCancel;
      this.imagesFlagDone = !this.imagesFlagDone;
      this.form = this.fb.group({
        images: [""]
      })
    } else {
      this.imagesFlagDone = !this.imagesFlagDone;
    }
    if (this.imagesFlagDone) {
      this.imagesCommentsList = ["matching", "slighty matching", "need more clarity"];
    } else {
      this.imagesCommentsList = []
    }
  }

  cancelFlagImage() {
    //Upload cancel flag
    if (this.imagesFlagDone) {
      this.imagesFlagDone = !this.imagesFlagDone;
      this.imagesFlagCancel = !this.imagesFlagCancel;
      this.form = this.fb.group({
        images: [""]
      })
    } else {
      this.imagesFlagCancel = !this.imagesFlagCancel;
    }
    if (this.imagesFlagCancel) {
      this.imagesCommentsList = ["not matching", "duplicate", "completely blur"];
    } else {
      this.imagesCommentsList = []
    }
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  goback() {
    this.router.navigate(["kyc_document"]);
  }

  onSubmit() {

    const formData = new FormData;

    if (this.businessFlagDone || this.bankingFlagCancel) {
      if (this.form.value.business_proof != "") {
        formData.append("business_proof", this.form.value.business_proof);
        formData.forEach((r) => console.log(r));
        alert("Business Details is Submitted")
        this.businessFlagDone = false;
        this.bankingFlagCancel = false;
        this.businessCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Business Details");
      }
    }


    if (this.ownershipFlagDone || this.ownershipFlagCancel) {
      if (this.form.value.ownership_proof != "") {
        formData.append("ownership_proof", this.form.value.ownership_proof);
        formData.forEach((r) => console.log(r));
        alert("Ownership Details is Submitted")
        this.ownershipFlagDone = false;
        this.ownershipFlagCancel = false;
        this.ownershipCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Ownership Details");
      }
    }


    if (this.vintageFlagDone || this.vintageFlagCancel) {
      if (this.form.value.vintage_proof != "") {
        formData.append("vintage_proof", this.form.value.vintage_proof);
        formData.forEach((r) => console.log(r));
        alert("Vintage Proof is Submitted")
        this.ownershipFlagDone = false;
        this.vintageFlagCancel = false;
        this.vintageCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Vintage Details");
      }
    }


    if (this.FirmFlagDone || this.FirmFlagCancel) {
      if (this.form.value.firm_details != "") {
        formData.append("firm_details", this.form.value.firm_details);
        formData.forEach((r) => console.log(r));
        alert(" PartnerShip & Firm Details is Submitted")
        this.FirmFlagDone = false;
        this.FirmFlagCancel = false;
        this.firmCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on PartnerShip & Firm Details");
      }
    }


    if (this.bankingFlagDone || this.bankingFlagCancel) {
      if (this.form.value.banking_details != "") {
        formData.append("banking_details", this.form.value.banking_details);
        formData.forEach((r) => console.log(r));
        alert("Banking Details is Submitted")
        this.bankingFlagDone = false;
        this.bankingFlagCancel = false;
        this.bankingCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Banking Details");
      }
    }


    if (this.gstFlagDone || this.gstFlagCancel) {
      if (this.form.value.gst_details != "") {
        formData.append("gst_details", this.form.value.gst_details);
        formData.forEach((r) => console.log(r));
        alert("Financial & GST Details is Submitted")
        this.gstFlagDone = false;
        this.gstFlagCancel = false;
        this.gstCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Financial & GST Details");
      }
    }

    if (this.imagesFlagDone || this.imagesFlagCancel) {
      if (this.form.value.images != "") {
        formData.append("images", this.form.value.images);
        formData.forEach((r) => console.log(r));
        alert("Uploaded Images Details is Submitted")
        this.imagesFlagDone = false;
        this.imagesFlagCancel = false;
        this.imagesCommentsList = [];
        // this.displayFlag=true;
      } else {
        alert("Please Comment on Uploaded Images Details");
      }
    }
  }
}
