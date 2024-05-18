import { OnDestroy, Type } from '@angular/core';
import { Subject } from 'rxjs';

export function TakeUntilDestroy<T extends Type<any>>(constructor: T) {
  const originalDestroy = constructor.prototype.ngOnDestroy;

  constructor.prototype.componentDestroy = function () {
    if (!this.destroy$) {
      this.destroy$ = new Subject<void>();
    }
    return this.destroy$.asObservable();
  };

  constructor.prototype.ngOnDestroy = function () {
    // Call the original ngOnDestroy if it exists
    if (originalDestroy && typeof originalDestroy === 'function') {
      originalDestroy.apply(this);
    }
    // Ensure the destroy$ subject is emitted and completed
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  };

  return constructor;
}
