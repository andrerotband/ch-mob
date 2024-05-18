import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.web.copahospeda',
  appName: 'Copa Hospeda',
  webDir: 'www/browser',
  server: {
    hostname: 'copahospeda.web.app',
    androidScheme: 'https'
  }
};

export default config;
