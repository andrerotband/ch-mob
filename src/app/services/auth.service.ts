import { Injectable, OnDestroy } from "@angular/core";
import { UserCredential, signInWithEmailAndPassword, getRedirectResult, AuthProvider, signInWithPopup, signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, signOut, getAuth } from "@angular/fire/auth";
import { UserStateService } from "./userstate.service";
import { TokenService } from "./token.service";
import { ErrorHandlerService } from "./errorhandler.service";
import { Platform } from "@ionic/angular/standalone";

@Injectable({
   providedIn: 'root',
})
export class AuthService implements OnDestroy {
   private auth = getAuth();

   constructor (private userStateService: UserStateService,
      private tokenService: TokenService, private errorService: ErrorHandlerService,
      private platform: Platform) {}

   ngOnDestroy(): void {
      this.tokenService.clearTokenRefreshInterval();
   }

   async signInAppWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
      try {
         const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
         this.userStateService.updateUserState(userCredential.user);
         this.tokenService.updateToken(userCredential.user);
         return userCredential;
      } catch (error) {
         this.errorService.handleError('Email ou Senha inválida!', error);
         throw error;
      }
   }

   async handleRedirectResult(): Promise<UserCredential | null> {
      try {
         return await getRedirectResult(this.auth);
      } catch (error) {
         this.errorService.handleError('Erro ao processar redirecionamento: ', error);
         return null;
      }
   }

   async signInWithProvider(provider: AuthProvider): Promise<UserCredential> {
      try {
         if (this.platform.is('desktop')) {
            return await signInWithPopup(this.auth, provider);
         } else {
            return await signInWithRedirect(this.auth, provider);
         }
      } catch (error) {
         this.errorService.handleError('Não foi possível efetuar o Login!', error);
         throw error;
      }
   }

   async signInWithGoogle(): Promise<void> {
      await signInWithRedirect(this.auth, new GoogleAuthProvider());
   }

   async signInWithFacebook(): Promise<void> {
      await signInWithRedirect(this.auth, new FacebookAuthProvider());
   }

   async signInWithTwitter(): Promise<void> {
      await signInWithRedirect(this.auth, new TwitterAuthProvider());
   }

   async signInWithGitHub(): Promise<void> {
      await signInWithRedirect(this.auth, new GithubAuthProvider());
   }

   async signAppOut(): Promise<void> {
      try {
         await signOut(this.auth);
         this.tokenService.clearTokenRefreshInterval();
      } catch (error) {
         this.errorService.handleError('Erro ao sair', error);
         throw error;
      }
   }
}
