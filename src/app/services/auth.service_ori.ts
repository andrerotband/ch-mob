import { Injectable, OnDestroy } from '@angular/core';
import {
  Auth, AuthProvider, authState, browserLocalPersistence, createUserWithEmailAndPassword, deleteUser, FacebookAuthProvider,
  getIdToken, getRedirectResult, GithubAuthProvider, GoogleAuthProvider,
  onIdTokenChanged, sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut,
  TwitterAuthProvider, updateProfile, User, UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Platform } from '@ionic/angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  readonly authState$: Observable<User | null> = authState(this.afAuth);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private tokenRefreshInterval?: number | undefined;

  constructor (private afAuth: Auth, private messageService: MessageService,
    private platform: Platform) {
    this.initializeAuth();
    this.monitorIdTokenChanges();
  }

  ngOnDestroy(): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.afAuth.setPersistence(browserLocalPersistence);
      this.afAuth.onAuthStateChanged(user => this.currentUserSubject.next(user));
    } catch (error) {
      this.handleError('Erro configuranto Autenticação!', error);
    }
  }

  private monitorIdTokenChanges(): void {
    onIdTokenChanged(this.afAuth, (user) => {
      if (user) {
        this.currentUserSubject.next(user);
        this.refreshTokenPeriodically(user);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private async refreshTokenPeriodically(user: User): Promise<void> {
    const ONE_HOUR = 3600 * 1000; // 1 hora em milissegundos
    this.tokenRefreshInterval = setInterval(async () => {
      try {
        const token = await getIdToken(user, true); // Força a renovação do token
        console.log('Token renovado:', token);
      } catch (error) {
        console.error('Erro ao renovar o token:', error);
      }
    }, ONE_HOUR) as unknown as number;
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.afAuth, email, password);
    } catch (error) {
      this.handleError('Email ou Senha inválida!', error);
      throw error;
    }
  }

  async handleRedirectResult(): Promise<UserCredential | null> {
    try {
      return await getRedirectResult(this.afAuth);
    } catch (error) {
      this.handleError('Erro ao processar redirecionamento: ', error);
      return null;
    }
  }

  async signInWithProvider(provider: AuthProvider): Promise<UserCredential> {
    try {
      if (this.platform.is('desktop')) {
        return await signInWithPopup(this.afAuth, provider);
      } else {
        return await signInWithRedirect(this.afAuth, provider);
      }
    } catch (error) {
      this.handleError('Não foi possível efetuar o Login!', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    await signInWithRedirect(this.afAuth, new GoogleAuthProvider());
  }

  async signInWithFacebook(): Promise<void> {
    await signInWithRedirect(this.afAuth, new FacebookAuthProvider());
  }

  async signInWithTwitter(): Promise<void> {
    await signInWithRedirect(this.afAuth, new TwitterAuthProvider());
  }

  async signInWithGitHub(): Promise<void> {
    await signInWithRedirect(this.afAuth, new GithubAuthProvider());
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.afAuth);
      this.currentUserSubject.next(null);
      if (this.tokenRefreshInterval) {
        clearInterval(this.tokenRefreshInterval);
      }
    } catch (error) {
      this.handleError('Erro ao sair', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.afAuth.currentUser;
  }

  getCurrentUserId(): Observable<string | undefined> {
    return this.currentUser$.pipe(map(user => user?.uid));
  }

  getCurrentUserEmail(): Observable<string | null | undefined> {
    return this.currentUser$.pipe(map(user => user?.email));
  }

  getCurrentUserPhotoURL(): string | null | undefined {
    return this.afAuth.currentUser?.photoURL;
  }

  getCurrentUserDisplayName(): string | null | undefined {
    return this.afAuth.currentUser?.displayName;
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential | null> {
    try {
      return await createUserWithEmailAndPassword(this.afAuth, email, password);
    } catch (error) {
      this.handleError('Erro ao criar Usuário!', error);
      throw error;
    }
  }

  async sendEmailVerification(): Promise<void> {
    const user = this.afAuth.currentUser;
    if (!user) {
      this.handleError('Nenhum usuário logado para enviar o email.', '');
      return;
    }
    try {
      await sendEmailVerification(user);
      this.messageService.infoMessage('Email de verificação enviado!');
    } catch (error) {
      this.handleError('Erro enviando email de verificação', error);
    }
  }

  async updateUserProfile(data: Partial<User>): Promise<void> {
    const user = this.afAuth.currentUser;
    if (!user) {
      this.handleError('Nenhum usuário logado para atualizar Perfil', '');
      return;
    }
    try {
      await updateProfile(user, data);
      this.messageService.infoMessage('Perfil Atualizado!');
    } catch (error) {
      this.handleError('Erro atualizando o Perfil!', error);
    }
  }

  deleteUser(user: User): Promise<void> {
    return deleteUser(user);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(
      map(user => !!user)
    );
  }

  private handleError(message: string, error: any): void {
    const errorMessage = `${ message }: ${ error.message || error }`;
    this.messageService.errorMessage(message);
    console.error(errorMessage);
  }
}
