import {Injectable} from "@angular/core";
import {
  AuthError,
  createClient,
  Session,
  SignInWithPasswordCredentials, SignUpWithPasswordCredentials,
  SupabaseClient,
  User, UserAttributes
} from "@supabase/supabase-js";
import {environment} from "@env/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {USER_SESSION_KEY} from "@shared/constants/constant";

type supabaseResponse = User | Session | AuthError | null;
@Injectable({ providedIn: 'root' })
export class AuthService{

  private supabaseClient: SupabaseClient;
  private userSubject = new BehaviorSubject<User | null>(null)

  constructor() {
    this.supabaseClient = createClient( environment.supabase.url, environment.supabase.publicKey);
    this.setUser();
  }

  get user$():Observable<User | null> {
    return this.userSubject.asObservable();
  }

  async signIn( credentials: SignInWithPasswordCredentials ): Promise<AuthError | UserAttributes | null>{

    try {
      const { data, error, ...rest } = await this.supabaseClient.auth.signInWithPassword(credentials);
      this.setUser();
      return error ? error : data.user;
    } catch (error) {
      console.log(error);
      return error as AuthError;
    }

  }

  async signUp( credentials: SignUpWithPasswordCredentials ): Promise<AuthError | UserAttributes | null>{


    try {
      const { data, error, ...rest } = await this.supabaseClient.auth.signUp(credentials);
      this.setUser();
      return error ? error : data.user;
    } catch (error) {
      return error as AuthError;
    }

  }

  signOut(): Promise< {error: AuthError | null} > {

    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();

  }

  private setUser(): void{

    const session = localStorage.getItem(USER_SESSION_KEY) as unknown as User;
    this.userSubject.next(session);

  }

}
