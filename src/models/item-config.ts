import { DocumentData, OrderByDirection } from "@angular/fire/firestore";
import { ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export interface ItemConfig {
  fieldName: string;
  label: string;
  visible: boolean;
  type: 'string' | 'number' | 'select' | 'date';
  required: boolean;
  options?: any[];
  dbOptions?: DBOptions;
  validation?: ValidatorFn;
}

export interface DBOptions {
  path: string;
  orderBy: string;
  orderDir?: OrderByDirection;
  key: string;
  value: string;
}

export interface ItemsList {
  dbPath: string,
  items$?: Observable<DocumentData[]>,
  itemsConfig: ItemConfig[],
  nomeView: string,
  pageSize: number;
}
