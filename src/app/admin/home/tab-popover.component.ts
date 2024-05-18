import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonItem, IonList, PopoverController } from '@ionic/angular/standalone';

export interface ItemMenu { url: string; label: string; }

@Injectable({
   providedIn: 'root'
})
export class TabPopoverService {
   constructor (private popoverController: PopoverController) {}

   async show(ev: Event, itemMenu: ItemMenu[]): Promise<void> {
      const popover = await this.popoverController.create({
         component: TabPopoverComponent,
         componentProps: { items: itemMenu },
         event: ev,
         translucent: true,
         dismissOnSelect: true,
         size: 'auto'
      });
      await popover.present();
   }
}


@Component({
   standalone: true,
   selector: 'app-tabpopover-component',
   template: `<ion-list>
      @for(item of items; track $index){
      <ion-item button="true" [routerLink]="currentUrl+item.url">{{item.label}}</ion-item>
      }
      </ion-list>`,
   imports: [IonList, IonItem, RouterLink]
})
export class TabPopoverComponent implements OnInit {
   @Input() items!: ItemMenu[];
   currentUrl!: string;
   constructor (private router: Router) {}

   ngOnInit(): void {
      const fullPath = this.router.routerState.snapshot.url;
      const segments = fullPath.split('/');
      this.currentUrl = segments.length > 1 ? '/' + segments[1] + '/' : fullPath;
   }

}
