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
        loadChildren: () =>
          import('../../app/introduction/introduction.module').then(
            (m) => m.IntroductionModule
          ),
        data: {
          name: 'introduction',
          index: 0,
          icon: 'kxnova-business-business-graph-bar-status',
        },
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('../../app/notes/notes.module').then((m) => m.NotesModule),
        data: { name: 'NOTES', index: 1, icon: 'kxnova-user-actions-group1' },
      },
      {
        path: 'users',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../app/users/users.module').then((m) => m.UsersModule),
        data: { name: 'USERS', index: 2, icon: 'kxnova-user-actions-group1' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'introduction',
    data: {},
  },
];
