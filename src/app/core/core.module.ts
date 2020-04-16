import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuAplicacaoComponent } from './menu-aplicacao/menu-aplicacao.component';
import { AgendaComponent } from './agendas/agenda/agenda.component';
import { ListaAgendasComponent } from './agendas/lista-agendas/lista-agendas.component';
import { ContatoComponent } from './contatos/contato/contato.component';
import { ListaContatosComponent } from './contatos/lista-contatos/lista-contatos.component';

@NgModule({
    declarations: [
        MenuAplicacaoComponent,
        AgendaComponent,
        ListaAgendasComponent,
        ContatoComponent,
        ListaContatosComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule],
    exports: []
})
export class CoreModule {

}