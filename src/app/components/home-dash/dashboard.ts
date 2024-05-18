import { Component, OnInit } from '@angular/core';

import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonRow, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [IonHeader, IonContent, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonImg, IonItem, HeaderComponent, RouterLink]
})
export class DashboardPage implements OnInit {
  dashOptions!: { img: string, name: string, link?: string }[]

  constructor() { }

  ngOnInit() {
    this.dashOptions = [
      { img: 'assets/calendar.png', name: 'Reservas', link: 'reservas' },
      { img: 'assets/despesas.png', name: 'Despesas', link: 'despesas' },
      { img: 'assets/statis.png', name: 'Estatísticas' },
      { img: 'assets/profile.jpeg', name: 'Google Maps', link: 'google-maps' },
      { img: 'assets/logout3.jpeg', name: 'Logout', link: 'logout' },
    ];
  }
}
