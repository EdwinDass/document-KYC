import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() routes: {
    title: string;
    path: string;
    icon: string;
  }[] = [];

  sideNavState = false;
  linkText = false;

  constructor(private router: Router, private route: ActivatedRoute){

  }
  ngOnInit(): void {}

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
  }
  openHome(){
    this.router.navigate(["home"]);
  
  }
  openPending() {
    this.router.navigate(["pending"]);
  }

  openApproved(){
    this.router.navigate(["approved"]);

  }



}
