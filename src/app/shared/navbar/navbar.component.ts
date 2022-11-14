import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$ = this.authSvc.user$;
  constructor( private readonly authSvc: AuthService ) { }

  ngOnInit(): void {
  }

  async onLogout():Promise<void>{
    try {
      await this.authSvc.signOut();
    }catch (error) {
      console.log(error);
    }
  }

}
