
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonButtons, IonHeader, IonIcon, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonToggle],
})
export class HeaderComponent implements OnInit {
  title = "Copa Hospeda";
  darkMode = false;

  constructor() {
    addIcons({ menuOutline, moonOutline, sunnyOutline });
  }

  ngOnInit() {
    this.loadDarkModePreference();
  }

  private async loadDarkModePreference() {
    this.darkMode = (await Preferences.get({ key: 'darkModeActivated' })).value === "true";
    this.updateBodyClass();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.updateBodyClass();
    Preferences.set({ key: 'darkModeActivated', value: String(this.darkMode) });
  }

  private updateBodyClass() {
    document.body.classList.toggle('dark', this.darkMode);
  }
}
