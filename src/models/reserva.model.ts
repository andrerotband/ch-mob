import { OrderByDirection } from "@angular/fire/firestore"
import { Apto } from "./apto.model"
import { dbAptos } from "./dbconfig.model"
import { ItemConfig } from "./item-config"

// Interfaces and Types
export interface ReservasTotais {
  chave: string
  totalLiquido: number
  totalBruto: number
  avgDias: number
  avgTotalDias: number
}

type Colors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'

export interface IStatusReservas {
  key: string
  order: OrderByDirection
  color: Colors
}

export interface Reserva {
  id: string
  cod_reserva: string
  aptos_id: Apto['id']
  checkin: Date
  checkout: Date
  nro_hospedes: number
  valor_noites: number
  valor_taxas?: number
  valor_descontos?: number
  valor_imposto?: number
  valor_anfitriao?: number
  data_receb_comis?: Date
  status: IStatusReservas['key']
  obs?: string
}

// Constants

export const StatusReservas: IStatusReservas[] = [
  { key: "Em Andamento", order: 'asc', color: 'warning' },
  { key: "Confirmada", order: 'asc', color: 'success' },
  { key: "Pós Estadia", order: 'asc', color: 'secondary' },
  { key: "Pendente", order: 'asc', color: 'danger' },
  { key: "Concluida", order: 'desc', color: 'tertiary' },
  { key: "Cancelada", order: 'desc', color: 'medium' },
]

// Form

export const ReservaConfig: ItemConfig[] = [
  { fieldName: 'cod_reserva', label: "Reserva", visible: true, type: 'string', required: true },
  { fieldName: 'aptos_id', label: 'Apto', visible: true, type: 'select', required: true, dbOptions: dbAptos },
  { fieldName: 'checkin', label: "Check-in", visible: true, type: 'date', required: true },
  { fieldName: 'checkout', label: "Check-Out", visible: true, type: 'date', required: true },
  { fieldName: 'nro_hospedes', label: "Nro Hóspedes", visible: true, type: 'number', required: false },
  { fieldName: 'valor_noites', label: "Valor Noite", visible: true, type: 'number', required: false },
  { fieldName: 'valor_taxas', label: "Valor Taxas", visible: false, type: 'number', required: false },
  { fieldName: 'valor_descontos', label: "Desconto", visible: false, type: 'number', required: false },
  { fieldName: 'valor_imposto', label: "Imposto", visible: false, type: 'number', required: false },
  { fieldName: 'valor_anfitriao', label: "Comissão", visible: false, type: 'number', required: false },
  { fieldName: 'data_receb_comis', label: "Data Comissão", visible: false, type: 'date', required: false },
  { fieldName: 'status', label: "Status", visible: true, type: 'select', required: true, options: StatusReservas },
  { fieldName: 'obs', label: "Observação", visible: true, type: 'string', required: false }
]
