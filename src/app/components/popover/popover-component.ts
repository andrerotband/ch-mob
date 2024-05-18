// popover-component.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonItem, IonList } from '@ionic/angular/standalone';

export interface ItemMenu {
    url: string;
    label: string;
}

@Component({
    standalone: true,
    selector: 'app-popover-component',
    template: `<ion-list>
        @for(item of items; track $index){
    <ion-item button="true" [routerLink]="currentUrl+item.url">{{item.label}}</ion-item>
        }
    </ion-list>`,
    imports: [IonList, IonItem, RouterLink]
})
export class PopoverComponent implements OnInit {
    @Input() items!: ItemMenu[];
    currentUrl!: string;
    constructor (private router: Router) {}

    ngOnInit(): void {
        const fullPath = this.router.routerState.snapshot.url;
        const segments = fullPath.split('/');
        this.currentUrl = segments.length > 1 ? '/' + segments[1] + '/' : fullPath;
    }

}
