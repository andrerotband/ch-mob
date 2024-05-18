import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Despesa } from 'src/models/despesa.model';
import { TiposdeDespesa } from 'src/models/tiposdedespesa.model';
import { Equipe } from 'src/models/equipe.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Injectable({ providedIn: 'root' })
export class DespesasService {
  constructor(private dbService: FirestoreService) { }

  async getStaticTiposdeDespesas(): Promise<TiposdeDespesa[]> {
    return await this.dbService.getStaticData<TiposdeDespesa>('tiposdedespesas', [{ field: 'nome', direction: 'asc' }]);
  }

  async getStaticEquipes(): Promise<Equipe[]> {
    return await this.dbService.getStaticData<Equipe>('equipes', [{ field: 'nome', direction: 'asc' }]);
  }

  async getStaticDespesasByReserva(reservaId: string): Promise<Despesa[]> {
    return await this.dbService.getStaticData<Despesa>('despesas', [
      { constraint: where('reservas_id', '==', reservaId) },
      { field: 'data_lanc', direction: 'desc' }
    ]);
  }

  async getStaticDespesasByLimit(limitD = 10): Promise<Despesa[]> {
    return await this.dbService.getStaticData<Despesa>('despesas', [
      { count: limitD },
      { field: 'data_lanc', direction: 'desc' }
    ]);
  }
}

