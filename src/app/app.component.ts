
import { Component, Injectable, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app'
import { Network } from '@capacitor/network'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonApp]
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {
  title = "Copa Hospeda";
  networkStatus!: string

  constructor (private router: Router, private ngZone: NgZone) {
    this.initializeApp()
  }

  initializeApp(): void {
    Network.addListener("networkStatusChange", (status) => {
      this.ngZone.run(() => {
        // This code will run in Angular's execution context
        this.networkStatus = status.connected ? "Online" : "Offline"
        console.log('Network Status: ' + this.networkStatus)
      })
    })
    App.addListener('appStateChange', (event: AppState) => {
      this.ngZone.run(() => {
        console.log(event.isActive)
      })
    })

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.ngZone.run(() => {
        const domain = 'copahospeda.dev.app'
        const pathArray = event.url.split(domain)
        const appPath = pathArray.pop()
        if (appPath) {
          this.router.navigateByUrl(appPath)
        }
      })
    })
  }

}
