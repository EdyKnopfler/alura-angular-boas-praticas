import { MensagemModule } from './../components/mensagem/mensagem.module';
import { CartaoModule } from './../components/cartao/cartao.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { AnimalComponent } from './animal/animal.component';
import { GradeFotosAnimaisComponent } from './grade-fotos-animais/grade-fotos-animais.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ComentariosComponent } from './detalhe-animal/comentarios/comentarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';


@NgModule({
  declarations: [
    ListaAnimaisComponent,
    AnimalComponent,
    GradeFotosAnimaisComponent,
    DetalheAnimalComponent,
    ComentariosComponent,
    NovoAnimalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AnimaisRoutingModule,
    CartaoModule,
    MensagemModule
  ]
})
export class AnimaisModule { }
