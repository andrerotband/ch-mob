import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { where } from '@angular/fire/firestore'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSpinner } from '@ionic/angular/standalone'
import { differenceInDays } from 'date-fns'
import { addIcons } from 'ionicons'
import { linkOutline } from 'ionicons/icons'
import { Observable } from 'rxjs/internal/Observable'
import { Subject } from 'rxjs/internal/Subject'
import { map, takeUntil } from 'rxjs/operators'
import { TakeUntilDestroy } from 'src/app/components/takeuntildestroy/take-until.destroy'
import { FirestoreService } from 'src/app/services/firestore.service'
import { Reserva } from 'src/models/reserva.model'
import { ReservasService } from '../reservas/reservas.service'

@Component({
  selector: 'app-agenda-page',
  standalone: true,
  imports: [IonItem, IonContent, IonLabel, IonRow, IonList, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonSpinner, AsyncPipe, DatePipe, TitleCasePipe, CurrencyPipe, NgClass, DecimalPipe],
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss']
})
@TakeUntilDestroy
export class AgendaPage implements OnInit, OnDestroy {
  isLoading = false;
  agenda$!: Observable<Reserva[]>
  private destroy$ = new Subject<void>();
  summary = {
    count: 0,
    totalBruto: 0,
    totalLiquido: 0,
    avgDias: 0,
    avgTotalDias: 0,
  };

  constructor (
    private dbService: FirestoreService,
    public resService: ReservasService
  ) {
    addIcons({ linkOutline })
  }

  ngOnInit (): void {
    this.getLiveReservas()
    this.calculateSummary()
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private getLiveReservas (): void {
    this.agenda$ = this.dbService.getLiveData<Reserva>('reservas', [
      { field: 'checkin', direction: 'asc' },
      { constraint: where('status', 'in', ['Confirmada', 'Em Andamento']) },
    ]).pipe(takeUntil(this.destroy$))
  }

  getNroDiasReserva (reserva: Reserva): number {
    return this.resService.calcNroDiasReserva(reserva)
  }

  getMediaTotalNroDias (reserva: Reserva): number {
    return reserva.valor_noites / this.getNroDiasReserva(reserva)
  }

  calcDiffDateToday (date: Date): number {
    return differenceInDays(date, new Date()) + 1
  }

  private calculateSummary (): void {
    this.agenda$.pipe(
      map((reservas) => this.resService.calculateTotals(reservas)),
      takeUntil(this.destroy$)
    ).subscribe((results) => {
      this.summary = { ...results }
    })
  }
}
