import { Component, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonLoading } from '@ionic/angular/standalone';

@Component({
   selector: 'app-loading-component',
   template: `<div></div>`,
})
@Injectable({
   providedIn: 'root',
})
export class LoadingComponent {

   constructor (private loadingCtrl: LoadingController) {
   }

   async showLoading(): Promise<void> {
      console.log('Show');
      const loadingObj = await this.loadingCtrl.create({
         message: 'Carregando...',
         id: 'loadingComponent',
      });
      loadingObj.present();
   }

   async hideLoading() {
      console.log('Hide');
      this.loadingCtrl.dismiss('loadingComponent');

   }
}
