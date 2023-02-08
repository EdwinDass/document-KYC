import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { LayoutComponent } from './core/layout/layout.component';
import { CoreModule } from './core/core.module';
import { ApprovedModule } from './modules/approved/approved.module';
import { PendingDocComponent } from './modules/pending/pending-doc/pending-doc.component';
import { PendingModule } from './modules/pending/pending.module';
import { HomeModule } from './modules/home/home.module';
import { DocDetailsComponent } from './modules/approved/doc-details/doc-details.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    CoreModule,
    HomeModule,
    PendingModule,
    ApprovedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
