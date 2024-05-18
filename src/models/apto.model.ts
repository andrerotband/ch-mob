import { Proprietario } from "./proprietario.model";
import { dbProps } from "./dbconfig.model";

export interface Apto {
  id: string;
  proprietarios_id: Proprietario['id'];
  apelido: string;
  cod_airbnb: string;
  endereco: string;
  nro_quartos: number;
  max_hospedes: number;
  taxa_lavanderia: number;
  taxa_limpeza: number;
  obs?: string;
}

export const AptoConfig = [
  { fieldName: 'proprietarios_id', label: 'Proprietários', visible: false, type: 'select', required: true, dbOptions: dbProps },
  { fieldName: 'apelido', label: 'Apelido', visible: true, type: 'string', required: true },
  { fieldName: 'cod_airbnb', label: 'Cod Airbnb', visible: false, type: 'string', required: false },
  { fieldName: 'endereco', label: 'Endereço', visible: true, type: 'string', required: true },
  { fieldName: 'nro_quartos', label: 'Nro Quartos', visible: true, type: 'number', required: true },
  { fieldName: 'max_hospedes', label: 'Max Hósp', visible: true, type: 'number', required: true },
  { fieldName: 'taxa_lavanderia', label: 'Lavanderia', visible: false, type: 'number', required: false },
  { fieldName: 'taxa_limpeza', label: 'Limpeza', visible: false, type: 'number', required: false },
  { fieldName: 'obs', label: 'Observação', visible: true, type: 'string', required: false },
];
