import { Component } from '@angular/core';

import { IonContent, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import {
  logOutOutline, calendarOutline, mapOutline, pieChartOutline, cashOutline, personCircleOutline, menuOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ItemMenu } from 'src/app/components/popover/popover-component';
import { TabPopoverService } from './tab-popover.component';

const ICONS = {
  logOutOutline, calendarOutline, mapOutline, pieChartOutline, cashOutline, personCircleOutline, menuOutline
};

interface ItemTab {
  tab: string | undefined;
  icon: string;
  label: string;
  popMenu?: ItemMenu[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonContent, IonTabs, IonTabButton, IonTabBar, IonLabel, IonIcon]
})
export class HomePage {
  readonly itemCharts: ItemMenu[] = [
    { url: 'chart-reservas-data', label: 'Reservas por Data' },
    { url: 'chart-reservas-status', label: 'Reservas por Status' },
  ];

  readonly itemTabs: ItemTab[] = [
    { tab: 'agenda', icon: 'calendar-outline', label: 'Agenda' },
    { tab: 'google-map', icon: 'map-outline', label: 'Google Map' },
    { tab: 'reservas', icon: 'cash-outline', label: 'Reservas' },
    //    { tab: 'profile', icon: 'person-circle-outline', label: 'Profile' },
    { tab: undefined, icon: 'pie-chart-outline', label: 'Gráficos', popMenu: this.itemCharts },
    { tab: 'logout', icon: 'log-out-outline', label: 'Sair' }
  ];

  constructor (private tabpopoverService: TabPopoverService) { addIcons(ICONS); }

  async onMenuButtonClick(ev: Event, items: ItemMenu[]): Promise<void> {
    await this.tabpopoverService.show(ev, items);
  }

}
