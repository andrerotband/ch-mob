
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu,
  IonMenuToggle, IonTitle, IonToolbar, IonAccordion,
  IonAccordionGroup
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline, calendarSharp, cashOutline, cashSharp, logOutOutline,
  logOutSharp, mapOutline, mapSharp, pieChartOutline, pieChartSharp,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TakeUntilDestroy } from '../takeuntildestroy/take-until.destroy';
import { SubMenuComponent } from './side-submenu.component';

const ICONS = {
  logOutOutline, logOutSharp, calendarOutline, calendarSharp,
  mapOutline, mapSharp, pieChartOutline, pieChartSharp, cashOutline, cashSharp
};

@Component({
  standalone: true,
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [IonMenu, IonContent, IonHeader, IonItem, IonMenuToggle, IonIcon, IonToolbar, IonTitle, SubMenuComponent],
  //  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class SideMenuComponent implements OnInit, OnDestroy {
  userLogged!: string | null;
  private authSubscription!: Subscription;
  @ViewChild('mainMenu') menu!: IonMenu;

  public appPages = [
    { title: 'Agenda', url: 'agenda', icon: 'calendar' },
    {
      title: 'Dashboard', icon: 'pie-chart',
      "children": [
        { title: 'Reservas por Data', url: 'chart-reservas-data', icon: 'pie-chart' },
        { title: 'Reservas por Status', url: 'chart-reservas-status', icon: 'pie-chart' },
      ]
    },
    { title: 'Despesas', url: 'despesas', icon: 'cash' },
    { title: 'Reservas', url: 'reservas', icon: 'calendar' },
    { title: 'Google Map', url: 'google-map', icon: 'map' },
    { title: 'Perfil', url: 'user-profile', icon: 'map' },
    { title: 'Logout', url: 'logout', icon: 'log-out' }
  ];

  constructor(private authService: AuthService) {
    addIcons(ICONS);
  }

  ngOnInit() {
    this.authSubscription = this.authService.authState$.subscribe(user => {
      this.userLogged = user ? user.email : 'Usuário Desconhecido';
      //      this.menu.open();
    });

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
