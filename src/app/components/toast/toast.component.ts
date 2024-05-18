
import { Component, Injectable } from '@angular/core';
import { AnimationBuilder, IonicSafeString, ToastController } from '@ionic/angular/standalone';

interface ToastButton {
  text?: string;
  icon?: string;
  side?: 'start' | 'end';
  role?: 'cancel' | string;
  cssClass?: string | string[];
  htmlAttributes?: { [key: string]: any; };
  handler?: () => boolean | void | Promise<boolean | void>;
}

interface ToastOptions {
  cssClass?: string | string[];
  duration?: number;
  buttons?: (ToastButton | string)[];
  header?: string;
  message?: string | IonicSafeString;
  position?: 'top' | 'bottom' | 'middle';
  translucent?: boolean;
  animated?: boolean;
  icon?: string;
  htmlAttributes?: { [key: string]: any; };
  color?: "danger" | "dark" | "light" | "medium" | "primary" | "secondary" | "success" | "tertiary" | "warning";
  mode?: "ios" | "md";
  keyboardClose?: boolean;
  id?: string;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

const colorMap = {
  'error': 'danger',
  'warning': 'warning',
  'info': 'success'
};

@Injectable({
  providedIn: 'root',
})
@Component({
  standalone: true,
  selector: 'app-toast',
  template: `<div></div>`,
  imports: [],
})
export class ToastComponent {
  constructor (private toastController: ToastController) {}

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom', type: "error" | "warning" | "info"): Promise<void> {
    try {
      const toast = await this.toastController.create({
        message: message,
        duration: 5000,
        position: position,
        color: colorMap[type]
      });

      await toast.present();
    } catch (error) {
      console.error('Error presenting toast', error);
    }
  }

}
