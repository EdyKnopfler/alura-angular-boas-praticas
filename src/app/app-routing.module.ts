import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',

    // lazy loading de módulos
    // boa prática: se um usuário em smartphone nunca acessa /admin,
    // economizamos banda por não carregar :)
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'animais',
    loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
