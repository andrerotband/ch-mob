import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'

import { GoogleMap } from '@capacitor/google-maps'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-google-map',
  standalone: true,
  template: `<capacitor-google-map #map></capacitor-google-map>`,
  styles: [`capacitor-google-map {
      display: inline-block;
      width: 100%;
      height: 100%;
    }`],
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapPage implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>
  newMap!: GoogleMap

  async ngAfterViewInit (): Promise<void> {
    await this.createMap()
  }

  async ngOnDestroy (): Promise<void> {
    await this.newMap.destroy()
  }

  async createMap (): Promise<void> {
    try {
      this.newMap = await GoogleMap.create({
        id: 'ch-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.firebaseConfig.apiKey,
        config: {
          center: { lat: -22.9624838, lng: -43.1817544 },
          zoom: 15,
        },
        //        forceCreate: true
      })
    } catch (error) {
      console.error('Error creating Google Map:', error)
    }
  }
}
