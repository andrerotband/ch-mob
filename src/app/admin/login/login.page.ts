// /path/to/login.page.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGithub, logoGoogle } from 'ionicons/icons';
import { TakeUntilDestroy } from 'src/app/components/takeuntildestroy/take-until.destroy';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, IonButton, IonIcon, IonLabel, IonInput, IonContent, IonImg]
})
@TakeUntilDestroy
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor (
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    addIcons({ logoGoogle, logoGithub });
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  async trySignIn(method: 'email' | 'Google' | 'GitHub'): Promise<void> {
    if (method === 'email' && !this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    await this.signIn(method);
  }

  private async signIn(method: 'email' | 'Google' | 'GitHub'): Promise<void> {
    switch (method) {
      case 'email':
        const { email, password } = this.loginForm.value;
        await this.authService.signInAppWithEmailAndPassword(email, password);
        break;
      case 'Google':
        await this.authService.signInWithGoogle();
        break;
      case 'GitHub':
        await this.authService.signInWithGitHub();
        break;
    }
    await this.postLoginActions();
  }

  private async postLoginActions(): Promise<void> {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
