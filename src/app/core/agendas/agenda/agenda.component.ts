import { Component, Input, Renderer2 } from '@angular/core';

import { AgendaResponse } from 'src/app/models/agendaResponse';
import { AgendasService } from '../agendas.service';
import { RequestResponse } from 'src/app/models/response/request-response';
import { HttpErrorResponse } from '@angular/common/http';
import * as alertfy from 'alertifyjs';

declare const $: any;

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
    // recebe os dados do pai de uma sala para usar no template
    @Input() agendaInput: AgendaResponse;

    constructor(private agendaService: AgendasService) {
    }

    ngOnInit(): void {
        console.log(this.agendaInput);

    }

    excluiAgenda(agendaId: string) {
        
        this.agendaService
        .excluirAgenda(agendaId)
        .subscribe((response: RequestResponse) => {
            if (response) {
                this.agendaService.setStatusAgenda();
                alertfy.success('Agenda excluida com sucesso');
            } else {
                alertfy.error('Erro ao excluir agenda');
            }
        }, (err: HttpErrorResponse) => {
            alertfy.error(err.error.mensagem);
            console.log(err);
        });
    }
}