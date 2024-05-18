import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/login/login.page').then(m => m.LoginPage),
    title: 'Login',
    ...canActivate(() => redirectLoggedInTo(['home'])),
  },
  {
    path: 'home',
    loadComponent: () => import('./admin/home/home.page').then(m => m.HomePage),
    ...canActivate(() => redirectUnauthorizedTo([''])),
    children: [
      {
        path: 'agenda',
        loadComponent: () => import('./pages/agenda/agenda.page').then(m => m.AgendaPage),
        title: 'Agenda',
      },
      {
        path: 'despesas',
        loadComponent: () => import('./pages/despesas/despesas.page').then(m => m.DespesasPage),
        title: 'Despesas',
      },
      {
        path: 'reservas',
        loadComponent: () => import('./pages/reservas/reservas.page').then(m => m.ReservasPage),
        title: 'Reservas',
      },
      {
        path: 'google-map',
        loadComponent: () => import('./pages/google-map/google-map.page').then(m => m.GoogleMapPage),
        title: 'Google Maps',
      },
      {
        path: 'profile',
        loadComponent: () => import('./admin/profile/profile.page').then(m => m.ProfilePage),
        title: 'Profile',
      },
      {
        path: 'logout',
        loadComponent: () => import('./admin/logout/logout.component').then(m => m.LogoutComponent),
      },
      {
        path: 'chart-reservas-data',
        loadComponent: () => import('./charts/reservas-data').then(m => m.ChartReservasPorDataPage),
        title: 'Gráfico Reservas por Data',
      },
      {
        path: 'chart-reservas-status',
        loadComponent: () => import('./charts/reservas-status').then(m => m.ChartReservasPorStatusPage),
        title: 'Gráfico Reservas por Status',
      },
    ],
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('./admin/page-not-found/page-not-found.page').then(m => m.PageNotFoundPage),
    title: 'Page Not Found',
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

export { routes };
