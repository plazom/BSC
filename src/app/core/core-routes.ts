import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth-guard';
import { MainContainerComponent } from './components/main-container/main-container.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
        data: {},
      },
      {
        path: 'introduction',
        loadChildren: () => import('../../app/introduction/introduction.module').then((m) => m.IntroductionModule),
        data: { name: 'introduction', index: 0},
      },
      {
        path: 'notes',
        loadChildren: () => import('../../app/notes/notes.module').then((m) => m.NotesModule),
        data: { name: 'notes', index: 1 },
      },
      {
        path: 'users',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../app/users/users.module').then((m) => m.UsersModule),
        data: { name: 'users', index: 2 },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'introduction',
    data: {},
  },
];
