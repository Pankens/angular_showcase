import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '@auth/services/auth.service';
import {ACTIONS} from "@shared/constants/constant";
import {AuthError, SignInWithPasswordCredentials, UserAttributes} from "@supabase/supabase-js";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

export interface OptionsForm {
  id: string;
  label: string;
}

interface UserResponse extends UserAttributes, AuthError { }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() options!: OptionsForm;

  authForm !: FormGroup;
  signIn = ACTIONS.signIn;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly router: Router,
    private readonly toastrSvc: ToastrService,
  ) {
  }

  ngOnInit(): void {

    this.initForm();

  }

  public async onSubmit(): Promise<void> {
    const credentials: SignInWithPasswordCredentials = this.authForm.value;
    let actionToCall;

    actionToCall = this.options.id == ACTIONS.signIn ? this.authSvc.signIn(credentials) : this.authSvc.signUp(credentials);

    try{
      const result = await actionToCall as UserResponse;
      if(result.email){
        this.redirectUser();
      } else {
        this.toastrSvc.info(result.message, 'Info');
      }
    } catch (error) {
      console.warn(error);
    }

  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private redirectUser():void {
    this.router.navigate(['/home'])
  }

}
