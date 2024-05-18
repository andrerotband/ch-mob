import { registerLocaleData } from "@angular/common"
import pt from '@angular/common/locales/pt'
import { enableProdMode, importProvidersFrom } from "@angular/core"
import { FirebaseApp, initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { Auth, getAuth, provideAuth } from "@angular/fire/auth"
import { Firestore, getFirestore, provideFirestore } from "@angular/fire/firestore"
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { RouteReuseStrategy, provideRouter, withViewTransitions } from "@angular/router"
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone'
import { environment } from "src/environments/environment"
import { routes } from "./app.routes"

registerLocaleData(pt)

if (environment.production) {
   enableProdMode()
}

const appConfig = {
   providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      provideRouter(routes, withViewTransitions()),
      provideAnimationsAsync(),
      importProvidersFrom(provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebaseConfig))),
      importProvidersFrom(provideAuth((): Auth => getAuth())),
      importProvidersFrom(provideFirestore((): Firestore => getFirestore())),]
}

export { appConfig }

