import { Component, Input, ViewChild } from '@angular/core'

import { IonButton } from '@ionic/angular/standalone'
import { ChartConfiguration, ChartData, ChartType } from 'chart.js/auto'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts'

//Chart.register(DataLabelsPlugin);

const BACKGROUNDCOLOR = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(255, 159, 64, 0.5)',
  'rgba(255, 205, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(201, 203, 207, 0.5)'
]
const BORDERCOLOR = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
]

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ["./chart.component.scss"],
  standalone: true,
  imports: [IonButton, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective
  @Input() chartButtons!: { name: string, fn: CallableFunction }[]
  @Input() chartData!: ChartData
  @Input() chartTitle: string = '';
  public chartType: ChartType = 'bar';
  public chartPlugins = [DataLabelsPlugin];
  public chartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: true,
    aspectRatio: 1.1,
    scales: {
      //      x: {
      ///        type: 'linear'
      //      },
      y: {
        //        type: 'logarithmic'
      }

    },
    elements: {
      bar: {
        backgroundColor: BACKGROUNDCOLOR,
        borderColor: BORDERCOLOR,
        borderRadius: 5,
      },
      line: {
        backgroundColor: BACKGROUNDCOLOR,
        borderColor: BORDERCOLOR,
        fill: true,
        tension: 0.2,
      }
    },
    plugins: {
      legend: { display: true },
      datalabels: { anchor: 'end', align: 'end' },
      title: { text: this.chartTitle || 'Gráfico Copa Hospeda' }
    },
  };

  public update (): void {
    this.chart?.update()
  }

  public changeChartType (): void {
    this.chartType = this.chartType === 'bar' ? 'line' : 'bar'
    this.update()
  }
}
