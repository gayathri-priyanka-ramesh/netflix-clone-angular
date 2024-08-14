import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (res) => res.LandingComponent
      ),
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./pages/browse/browse.component').then(
        (res) => res.BrowseComponent
      ),
  },
];
