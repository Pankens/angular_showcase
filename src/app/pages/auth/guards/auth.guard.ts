import {CanActivate, Router} from "@angular/router";
import {USER_SESSION_KEY} from "@shared/constants/constant";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) { }

  canActivate(): boolean{
    if (localStorage.getItem(USER_SESSION_KEY)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
