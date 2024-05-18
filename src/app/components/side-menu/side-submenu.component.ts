import { Component, Input } from '@angular/core';
import { IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-submenu',
  template: `<ion-item routerDirection="root" [routerLink]="[item.url]" lines="none" detail="false" button="true"
          routerLinkActive="selected">
          <ion-icon aria-hidden="true" slot="start" [ios]="item.icon + '-outline'"
            [md]="item.icon + '-sharp'"></ion-icon>
          <ion-label>{{ item.title }}</ion-label>
        </ion-item>`,
  imports: [IonItem, IonLabel, IonIcon, RouterLink]
})
export class SubMenuComponent {
  @Input() item!: any;
}
