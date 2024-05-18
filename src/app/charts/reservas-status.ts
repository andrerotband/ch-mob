// /path/to/chart-reservas-por-status.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartComponent } from '../components/chart/chart.component';
import { ChartData } from 'chart.js';
import { ReservasService } from '../pages/reservas/reservas.service';
import { ReservasTotais } from 'src/models/reserva.model';

@Component({
  selector: 'app-reservasstatus-chart',
  template: `
    <app-chart-component #chartComp [chartData]="chartData"
    [chartButtons]="chartButtons"></app-chart-component>
  `,
  standalone: true,
  imports: [ChartComponent]
})
export class ChartReservasPorStatusPage implements OnInit {
  @ViewChild(ChartComponent) private chartComponent!: ChartComponent;
  statusTotals!: ReservasTotais[];

  chartButtons = [
    { name: 'Tot p/ Status', fn: () => this.updateChartData('totalBruto', 'Soma Total das Reservas (R$)') },
    { name: 'Med Dias', fn: () => this.updateChartData('avgDias', 'Média de Nro de Dias') },
    { name: 'Tot/Dias', fn: () => this.updateChartData('avgTotalDias', 'Soma Total / Nro de Dias (R$') },
  ];

  chartData: ChartData = {
    labels: [],
    datasets: [{ data: [] }],
  };

  constructor (private reservasService: ReservasService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.statusTotals = this.reservasService.calcReservasTotaisPorStatus(
        await this.reservasService.getStaticReservas());;
      this.updateChartData('totalBruto', 'Soma Total das Reservas (R$)');
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  private updateChartData(property: keyof ReservasTotais, label: string): void {
    this.chartData.labels = this.statusTotals.map(item => item.chave);
    this.chartData.datasets[0].data = this.statusTotals.map(item => item[property] as number);
    this.chartData.datasets[0].label = label;
    this.chartComponent.update();
  }
}
