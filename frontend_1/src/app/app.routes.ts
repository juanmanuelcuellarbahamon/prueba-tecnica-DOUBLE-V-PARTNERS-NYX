import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'github',
    pathMatch: 'full',
  },
  {
    path: 'github',
    loadComponent: () =>
      import('./github-component/github-component').then((c) => c.GithubComponent),
  },
];
