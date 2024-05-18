import { Injectable, OnDestroy } from '@angular/core'
import { addMonths } from 'date-fns/addMonths'
import { differenceInDays } from 'date-fns/differenceInDays'
import { lightFormat } from 'date-fns/lightFormat'
import { Observable, Subject, takeUntil } from 'rxjs'
import { FirestoreService } from 'src/app/services/firestore.service'
import { IStatusReservas, Reserva, ReservasTotais, StatusReservas } from 'src/models/reserva.model'

@Injectable({ providedIn: 'root' })
export class ReservasService implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor (private dbService: FirestoreService) {}

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  getStatusOption (status: string): IStatusReservas | undefined {
    return StatusReservas.find(option => option.key === status)
  }

  getLiveReservas (): Observable<Reserva[]> {
    return this.dbService.getLiveData<Reserva>('reservas', [{ field: 'checkin', direction: 'desc' }])
      .pipe(takeUntil(this.destroy$))
  }

  getStaticReservas (): Promise<Reserva[]> {
    return this.dbService.getStaticData<Reserva>('reservas', [{ field: 'checkin', direction: 'asc' }])
  }

  calcNroDiasReserva (reserva: Reserva): number {
    return differenceInDays(new Date(reserva.checkout), new Date(reserva.checkin))
  }

  calcValorTotalLiquidoReserva (reserva: Reserva): number {
    const { valor_noites = 0, valor_anfitriao = 0, valor_taxas = 0, valor_descontos = 0, valor_imposto = 0 } = reserva
    return valor_noites + valor_taxas - valor_descontos - valor_imposto - valor_anfitriao
  }

  generateMonthlyDateStrings (startDate = new Date(), monthsToAdd = 12): string[] {
    return Array.from({ length: monthsToAdd }, (_, i) => lightFormat(addMonths(startDate, i), 'yyyy-MM'))
  }

  private groupReservasByKey (reservas: Reserva[], keyExtractor: (reserva: Reserva) => string): Record<string, Reserva[]> {
    return reservas.reduce((acc, reserva) => {
      const key = keyExtractor(reserva);
      (acc[key] = acc[key] || []).push(reserva)
      return acc
    }, {} as Record<string, Reserva[]>)
  }

  groupReservasByStatus (reservas: Reserva[]): Record<string, Reserva[]> {
    return this.groupReservasByKey(reservas, reserva => reserva.status)
  }

  groupReservasByMonth (reservas: Reserva[]): Record<string, Reserva[]> {
    return this.groupReservasByKey(reservas, reserva => lightFormat(reserva.checkin, 'yyyy-MM'))
  }

  calculateTotals (reservas: Reserva[]): { count: number, totalBruto: number, totalLiquido: number, avgDias: number, avgTotalDias: number } {
    const totalBruto = reservas.reduce((sum, reserva) => sum + reserva.valor_noites, 0)
    const totalLiquido = reservas.reduce((sum, reserva) => sum + this.calcValorTotalLiquidoReserva(reserva), 0)
    const totalDias = reservas.reduce((sum, reserva) => sum + this.calcNroDiasReserva(reserva), 0)
    return {
      count: reservas.length,
      totalBruto,
      totalLiquido,
      avgDias: totalDias > 0 ? Math.round(totalDias / reservas.length) : 0,
      avgTotalDias: totalDias > 0 ? Math.round(totalBruto / totalDias) : 0
    }
  }

  calcReservasTotaisPorStatus (reservas: Reserva[]): ReservasTotais[] {
    return Object.entries(this.groupReservasByStatus(reservas))
      .map(([status, reservas]) => ({ chave: status, ...this.calculateTotals(reservas) }))
  }

  calcReservasTotaisPorMes (reservas: Reserva[]): ReservasTotais[] {
    return Object.entries(this.groupReservasByMonth(reservas))
      .map(([mes, reservasDoMes]) => ({ chave: mes, ...this.calculateTotals(reservasDoMes) }))
      .sort((a, b) => a.chave.localeCompare(b.chave))
  }

}
