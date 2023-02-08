import { Component, Input, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('leftSidenav') leftSidenav!: MatSidenav;
  logochange: boolean | undefined;
  sidenavWidth = 5;
  @Input() sidenav!: MatSidenav;

  routes: {
    title: string;
    path: string;
    icon: string;
  }[] = [];

  constructor(private router : Router){
  }

  increase(){
    this.sidenavWidth = 17;
    this.logochange = true;
  }
  decrease(){
    this.sidenavWidth = 5;
    this.logochange = false;
  }
  toggleMenu() {
    this.sidenav.toggle();
  }
  logout(){
    this.router.navigate(['login']);
  }
}
