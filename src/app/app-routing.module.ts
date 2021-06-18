import { LoginGuard } from './autenticacao/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',

    // lazy loading de módulos
    // boa prática: se um usuário em smartphone nunca acessa /admin,
    // economizamos banda por não carregar :)
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),

    // guarda de rota (ver autenticacao/login.guard.ts)
    canLoad: [LoginGuard]
  },
  {
    path: 'animais',
    loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule),
    canLoad: [AutenticacaoGuard]  //  (autenticacao/autenticacao.guard.ts)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
