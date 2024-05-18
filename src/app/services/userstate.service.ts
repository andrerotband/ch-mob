import { Injectable } from "@angular/core";
import { User, UserCredential, browserLocalPersistence, createUserWithEmailAndPassword, deleteUser, getAuth, sendEmailVerification, updateProfile } from "@angular/fire/auth";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ErrorHandlerService } from "./errorhandler.service";
import { MessageService } from "./message.service";

@Injectable({
   providedIn: 'root',
})
export class UserStateService {
   private auth = getAuth();
   private currentUserSubject = new BehaviorSubject<User | null>(null);
   currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

   constructor (private errorService: ErrorHandlerService,
      private messageService: MessageService) {
      this.initializeAuthState();
   }

   private async initializeAuthState(): Promise<void> {
      try {
         await this.auth.setPersistence(browserLocalPersistence);
         this.auth.onAuthStateChanged(user => this.currentUserSubject.next(user));
      } catch (error) {
         this.errorService.handleError('Error setting up authentication state', error);
      }
   }

   updateUserState(user: User | null): void {
      this.currentUserSubject.next(user);
   }

   getCurrentUser(): User | null {
      return this.auth.currentUser;
   }

   getCurrentUserId(): Observable<string | undefined> {
      return this.currentUser$.pipe(map(user => user?.uid));
   }

   getCurrentUserEmail(): Observable<string | null | undefined> {
      return this.currentUser$.pipe(map(user => user?.email));
   }

   getCurrentUserPhotoURL(): string | null | undefined {
      return this.auth.currentUser?.photoURL;
   }

   getCurrentUserDisplayName(): string | null | undefined {
      return this.auth.currentUser?.displayName;
   }

   async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential | null> {
      try {
         return await createUserWithEmailAndPassword(this.auth, email, password);
      } catch (error) {
         this.errorService.handleError('Erro ao criar Usuário!', error);
         throw error;
      }
   }

   async sendEmailVerification(): Promise<void> {
      const user = this.auth.currentUser;
      if (!user) {
         this.errorService.handleError('Nenhum usuário logado para enviar o email.', '');
         return;
      }
      try {
         await sendEmailVerification(user);
         this.messageService.infoMessage('Email de verificação enviado!');
      } catch (error) {
         this.errorService.handleError('Erro enviando email de verificação', error);
      }
   }

   async updateUserProfile(data: Partial<User>): Promise<void> {
      const user = this.auth.currentUser;
      if (!user) {
         this.errorService.handleError('Nenhum usuário logado para atualizar Perfil', '');
         return;
      }
      try {
         await updateProfile(user, data);
         this.messageService.infoMessage('Perfil Atualizado!');
      } catch (error) {
         this.errorService.handleError('Erro atualizando o Perfil!', error);
      }
   }

   deleteUser(user: User): Promise<void> {
      return deleteUser(user);
   }
}
