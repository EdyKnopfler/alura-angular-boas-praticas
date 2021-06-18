import { NovoAnimalComponent } from './novo-animal/novo-animal.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';

const routes: Routes = [
  // Guarda Resolver (ver lista-animais.resolver.ts)
  // Atribuímos à variável animais
  { path: '', component: ListaAnimaisComponent, resolve: { animais: ListaAnimaisResolver } },

  { path: 'novo', component: NovoAnimalComponent },

  // A raiz aqui é /animais, então este path é /animais/<id>
  { path: ':animalId', component: DetalheAnimalComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
