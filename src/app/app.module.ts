import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignInModule} from "@auth/sign-in/sign-in.module";
import {NavbarModule} from "@shared/navbar/navbar.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SignInModule,
        NavbarModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          preventDuplicates: true,
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
