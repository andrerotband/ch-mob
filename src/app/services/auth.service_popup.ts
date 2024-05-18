import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  browserLocalPersistence,
  authState,
  signOut,
  deleteUser,
  getRedirectResult,
  signInWithRedirect,
} from '@angular/fire/auth';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAuthState = new BehaviorSubject<User | null>(null);
  readonly authState$ = authState(this.afAuth);
  redirectUrl: string | null = null;

  constructor(
    private afAuth: Auth,
    private messageService: MessageService
  ) {
    this.afAuth.onAuthStateChanged((user) => this.myAuthState.next(user));
    this.afAuth.setPersistence(browserLocalPersistence);
  }

  // Sign in with email and password
  async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.afAuth, email, password);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async signIn(provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider): Promise<void> {
    try {
      this.signInRedirect(provider);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }


  // Sign in With Redirect
  private async signInRedirect(provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider): Promise<void> {
    await signInWithRedirect(this.afAuth, provider);
  }
  //
  async handleRedirectResult(): Promise<UserCredential | null> {
    const result = await getRedirectResult(this.afAuth);
    if (result) {
      return result;
    }
    return null;
  }
  handleAuthRedirect() {
    this.handleRedirectResult().then((userCredential) => {
      return (userCredential)
    })
  }


  // Sign in With Popup
  private async signInWithPopup(provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider): Promise<UserCredential> {
    try {
      return await signInWithPopup(this.afAuth, provider);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<UserCredential> {
    return await this.signIn(new GoogleAuthProvider());
  }

  signInWithFacebook(): Promise<UserCredential> {
    return this.signIn(new FacebookAuthProvider());
  }

  signInWithTwitter(): Promise<UserCredential> {
    return this.signIn(new TwitterAuthProvider());
  }

  signInWithGitHub(): Promise<UserCredential> {
    return this.signIn(new GithubAuthProvider());
  }

  async signOut(): Promise<void> {
    await signOut(this.afAuth);
  }

  getCurrentUser(): User | null {
    return this.afAuth.currentUser;
  }

  getCurrentUserId(): string | undefined {
    return this.afAuth.currentUser?.uid;
  }

  getCurrentUserEmail(): string | null | undefined {
    return this.afAuth.currentUser?.email;
  }

  getCurrentUserPhotoURL(): string | null | undefined {
    return this.afAuth.currentUser?.photoURL;
  }

  getCurrentUserDisplayName(): string | null | undefined {
    return this.afAuth.currentUser?.displayName;
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
      return userCredential;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  sendEmailVerification(): Promise<void> | null {
    if (this.afAuth.currentUser) {
      return sendEmailVerification(this.afAuth.currentUser);
    }
    return null;
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.afAuth, email);
  }

  updateUserProfile(data: any): Promise<void> | null {
    if (this.afAuth.currentUser) {
      return updateProfile(this.afAuth.currentUser, data);
    }
    return null;
  }

  deleteUser(user: User): Promise<void> {
    return deleteUser(user);
  }

  isAuthenticated(): boolean {
    return this.afAuth.currentUser != null;
  }

  private handleError(error: any): void {
    const errorMessage = this.getErrorMessage(error);
    this.messageService.displayError(errorMessage);
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      return `Error in authentication: ${error.message}`;
    }
    return 'An unknown error occurred.';
  }
}
