import { Injectable } from "@angular/core";
import { getAuth, onIdTokenChanged, User, getIdToken } from "@angular/fire/auth";

const ONE_HOUR = 3600 * 1000; // 1 hour in milliseconds

@Injectable({
   providedIn: 'root',
})
export class TokenService {
   private tokenRefreshInterval?: number;
   private auth = getAuth();

   constructor () {}

   updateToken(user: User): void {
      this.refreshTokenPeriodically(user);
      onIdTokenChanged(this.auth, updatedUser => {
         if (updatedUser) this.refreshTokenPeriodically(updatedUser);
      });
   }

   private async refreshTokenPeriodically(user: User): Promise<void> {
      this.tokenRefreshInterval = setInterval(async () => {
         await getIdToken(user, true);
      }, ONE_HOUR) as unknown as number;
   }

   clearTokenRefreshInterval(): void {
      if (this.tokenRefreshInterval) {
         clearInterval(this.tokenRefreshInterval);
      }
   }

}
