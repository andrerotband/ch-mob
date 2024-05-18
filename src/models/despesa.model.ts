import { Equipe } from "./equipe.model";
import { Reserva } from "./reserva.model";
import { TiposdeDespesa } from "./tiposdedespesa.model";
import { ItemConfig } from "./item-config";
import { dbEquipes, dbReservas, dbTiposdeDespesas } from "./dbconfig.model";

export interface Despesa {
  reservas_id: Reserva['id'];
  equipes_id: Equipe['id'];
  tiposdedespesas_id: TiposdeDespesa['id'];
  data_exec: Date;
  data_lanc: Date;
  data_pgto?: Date;
  data_receb?: Date;
  valor: number;
  obs?: string;
}

export const DespesaConfig: ItemConfig[] = [
  { fieldName: 'reservas_id', label: "Reserva", visible: true, type: 'select', required: true, dbOptions: dbReservas },
  { fieldName: 'equipes_id', label: 'Equipe', visible: true, type: 'select', required: true, dbOptions: dbEquipes },
  { fieldName: 'tiposdedespesas_id', label: "Tipo", visible: true, type: 'select', required: true, dbOptions: dbTiposdeDespesas },
  { fieldName: 'data_exec', label: "Data Exec", visible: true, type: 'date', required: false },
  { fieldName: 'data_lanc', label: "Data Lanc-", visible: true, type: 'date', required: true },
  { fieldName: 'data_pgto', label: "Data Pgto", visible: true, type: 'date', required: false },
  { fieldName: 'data_receb', label: "Data Receb", visible: true, type: 'date', required: false },
  { fieldName: 'valor', label: "Valor", visible: true, type: 'number', required: false },
  { fieldName: 'obs', label: "Observação", visible: true, type: 'string', required: false }
];
