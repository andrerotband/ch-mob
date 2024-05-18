
import { Component, OnInit } from '@angular/core'
import {
  IonAccordion, IonAccordionGroup, IonBadge, IonContent, IonIcon, IonItem,
  IonLabel, IonSpinner
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { listCircle } from 'ionicons/icons'
import { TakeUntilDestroy } from 'src/app/components/takeuntildestroy/take-until.destroy'
import { Reserva, StatusReservas } from 'src/models/reserva.model'
import { ReservasItensComponent } from "./items/reservas-itens.component"
import { ReservasService } from './reservas.service'

@Component({
  standalone: true,
  selector: 'app-reservas-page',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  imports: [IonItem, IonIcon, IonAccordion, IonAccordionGroup, IonContent, IonLabel, IonBadge, IonSpinner, ReservasItensComponent],
  //  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class ReservasPage implements OnInit {
  reservationsByStatus!: Record<string, Reserva[]>
  statusReservas = StatusReservas;
  isLoading = false;

  constructor (public reservasService: ReservasService) {
    addIcons({ listCircle })
  }

  async ngOnInit (): Promise<void> {
    try {
      this.isLoading = true
      const reservas = this.reservasService.getStaticReservas()
      this.reservationsByStatus = this.reservasService.groupReservasByStatus(await reservas)
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }

}
