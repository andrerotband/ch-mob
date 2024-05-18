import { Component, OnInit } from '@angular/core';

import { User } from '@angular/fire/auth';
import {
  IonContent, IonInput, IonItem, IonImg, IonButton, IonLabel, IonAvatar
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/services/userstate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonAvatar, IonInput, IonItem, IonImg, IonButton, IonLabel, ReactiveFormsModule],
})
export class ProfilePage implements OnInit {
  user!: User | null;
  profileForm!: FormGroup;
  isLoading = false;

  constructor (
    private userStateService: UserStateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeUserAndForm();
  }

  private initializeUserAndForm(): void {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.profileForm = this.fb.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        displayName: [this.user.displayName, [Validators.required]],
        phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.minLength(8)]]
      });
    } else {
      // Lidar com o caso em que não há usuário logado
      // Por exemplo, redirecionar para a página de login ou mostrar uma mensagem
    }
  }

  async tryUpdate(): Promise<void> {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    try {
      await this.userStateService.updateUserProfile(this.profileForm.value);
    } finally {
      this.isLoading = false;
    }
  }

  async authEmail(): Promise<void> {
    this.isLoading = true;
    try {
      await this.userStateService.sendEmailVerification();
    } finally {
      this.isLoading = false;
    }
  }

  changeImage(): void {
    // TODO: Implementar lógica de mudança de imagem
  }
}
