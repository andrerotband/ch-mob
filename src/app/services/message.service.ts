import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import { BehaviorSubject, timer } from 'rxjs';
import { ToastComponent } from '../components/toast/toast.component';

export enum MessageType { Error = 'error', Warning = 'warning', Info = 'info' }
export enum NotificationType { Toast, Alert }
export interface Message { content: string; type: MessageType; }

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject<Message>({ content: '', type: MessageType.Info });
  currentMessage = this.messageSource.asObservable();

  constructor (private alertCtrl: AlertController, private toastService: ToastComponent) {}

  newMessage(message: string, type: MessageType = MessageType.Info, notificationType: NotificationType = NotificationType.Toast): void {
    this.messageSource.next({ content: message, type });
    this.presentMessage(notificationType);
  }

  clearMessage(delay: number = 0): void {
    timer(delay).subscribe(() => this.messageSource.next({ content: '', type: MessageType.Info }));
  }

  errorMessage(message: string, notificationType: NotificationType = NotificationType.Alert): void {
    this.newMessage(message, MessageType.Error, notificationType);
  }

  warningMessage(message: string, notificationType: NotificationType = NotificationType.Toast): void {
    this.newMessage(message, MessageType.Warning, notificationType);
  }

  infoMessage(message: string, notificationType: NotificationType = NotificationType.Toast): void {
    this.newMessage(message, MessageType.Info, notificationType);
  }

  private presentMessage(notificationType: NotificationType): void {
    const currentMessage = this.messageSource.getValue();
    if (notificationType === NotificationType.Alert) {
      this.presentAlert(currentMessage.content, this.getColor(currentMessage.type));
    } else {
      this.toastService.presentToast(currentMessage.content, 'bottom', currentMessage.type);
    }
  }

  private async presentAlert(errorMessage: string, color: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: errorMessage,
      buttons: ['OK'],
      cssClass: `alert-${ color }`
    });
    await alert.present();
  }

  private getColor(messageType: MessageType): string {
    switch (messageType) {
      case MessageType.Error: return 'red';
      case MessageType.Warning: return 'yellow';
      case MessageType.Info: return 'blue';
      default: return 'blue';
    }
  }
}
