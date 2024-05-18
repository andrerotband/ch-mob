import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonItem, IonRow } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { enterOutline, exitOutline, linkOutline } from 'ionicons/icons'
import { Reserva } from 'src/models/reserva.model'
import { ReservasService } from '../reservas.service'

@Component({
  standalone: true,
  selector: 'app-reservas-itens',
  templateUrl: './reservas-itens.component.html',
  styleUrls: ['./reservas-itens.component.scss'],
  imports: [CommonModule, IonRow, IonCol, IonIcon, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservasItensComponent {
  @Input() reserva!: Reserva

  constructor (public reservasService: ReservasService) {
    addIcons({ enterOutline, exitOutline, linkOutline })
  }

}
