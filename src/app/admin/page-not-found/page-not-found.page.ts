import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PageNotFoundPage {

  constructor() { }

}
