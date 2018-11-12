import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: './modules/account/account.module#AccountModule',
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: '',
    loadChildren: './modules/main/main.module#MainModule',
  },
  {
    path: '**',
    loadChildren: './modules/main/main.module#MainModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutesModule {}
