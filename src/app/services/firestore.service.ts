// /path/to/firestore.service.ts
import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore,
  getDoc, getDocs, limit, orderBy, OrderByDirection, query, QueryConstraint, updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { isThisQuarter } from 'date-fns';
import { map } from 'ionicons/icons';

export interface OrderByOption { field: string; direction: OrderByDirection; }
export interface WhereOption { constraint: QueryConstraint; }
export interface LimitOption { count: number; }
export type QueryOptions = OrderByOption | WhereOption | LimitOption;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor (private dbService: Firestore, private messageService: MessageService) {}

  private getBaseQuery(options?: QueryOptions[]): QueryConstraint[] {
    const constraints: QueryConstraint[] = [];
    if (options) {
      for (const option of options) {
        if ('field' in option) {
          constraints.push(orderBy(option.field, option.direction));
        } else if ('constraint' in option) {
          constraints.push(option.constraint);
        } else if ('count' in option) {
          constraints.push(limit(option.count));
        }
      }
    }
    return constraints;
  }

  getLiveData<T>(path: string, options?: QueryOptions[]): Observable<T[]> {
    const collectionRef = collection(this.dbService, path);
    return collectionData(query(collectionRef, ...this.getBaseQuery(options)), { idField: 'id' }) as Observable<T[]>;
  }

  getStaticData<T>(path: string, options?: QueryOptions[]): Promise<T[]> {
    return this.executeFirestoreOperation(async () => {
      const collectionRef = collection(this.dbService, path);
      const querySnap = await getDocs(query(collectionRef, ...this.getBaseQuery(options)));
      return querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    });
  }

  getDataById<T>(path: string, id: string): Promise<T | undefined> {
    return this.executeFirestoreOperation(async () => {
      const docSnap = await getDoc(doc(this.dbService, path, id));
      return docSnap.exists() ? (docSnap.data() as T) : undefined;
    });
  }

  addData<T>(path: string, data: DocumentData): Promise<DocumentData> {
    return this.executeFirestoreOperation(() => addDoc(collection(this.dbService, path), data));
  }

  updateData<T>(path: string, id: string, data: Partial<T>): Promise<void> {
    return this.executeFirestoreOperation(() => updateDoc(doc(this.dbService, path, id), data));
  }

  delData(path: string, id: string): Promise<void> {
    return this.executeFirestoreOperation(() => deleteDoc(doc(this.dbService, path, id)));
  }

  private async executeFirestoreOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.handleError("Firestore operation failed: " + error);
      throw error;
    }
  }

  private handleError(error: any): void {
    this.messageService.errorMessage(error);
    console.error('Error:', error);
  }
}
