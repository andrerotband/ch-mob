import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasService } from 'src/app/pages/despesas/despesas.service';
import { Subject } from 'rxjs';
import { Despesa } from 'src/models/despesa.model';
import { Equipe } from 'src/models/equipe.model';
import { TiposdeDespesa } from 'src/models/tiposdedespesa.model';
import { IonCol, IonItem, IonList, IonRow, IonContent } from '@ionic/angular/standalone';
import { TakeUntilDestroy } from 'src/app/components/takeuntildestroy/take-until.destroy';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonRow, IonCol, IonItem, IonContent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@TakeUntilDestroy
export class DespesasPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  despesas: Despesa[] = [];
  tiposDeDespesas: TiposdeDespesa[] = [];
  equipes: Equipe[] = [];

  constructor (private despesasService: DespesasService) {}

  async ngOnInit(): Promise<void> {
    [this.equipes, this.tiposDeDespesas, this.despesas] = await Promise.all([
      this.despesasService.getStaticEquipes(),
      this.despesasService.getStaticTiposdeDespesas(),
      this.despesasService.getStaticDespesasByLimit(20)
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getNomeTipodeDespesas(tiposdedespesas_id: string): string {
    return this.tiposDeDespesas.find(tipo => tipo.id === tiposdedespesas_id)?.nome ?? 'N/A';
  }

  getNomeEquipes(equipes_id: Despesa['equipes_id']): string {
    return this.equipes.find(tipo => tipo.id === equipes_id)?.nome ?? 'N/A';
  }

}
