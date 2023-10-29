import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './lib/guards/auth-guard.guard';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
        // canActivate: [authGuard({ requiresAuthentication: false })],
      },
      {
        path: 'note',
        loadChildren: () =>
          import('./pages/note/note.module').then((m) => m.NoteModule),
        canActivate: [authGuard({ requiresAuthentication: true })],
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./pages/chat/chat.module').then((m) => m.ChatModule),
        canActivate: [authGuard({ requiresAuthentication: true })],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/note' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
