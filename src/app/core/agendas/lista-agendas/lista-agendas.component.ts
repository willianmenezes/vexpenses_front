import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as  alertfy from 'alertifyjs';

import { AgendaResponse } from 'src/app/models/agendaResponse';
import { AgendasService } from '../agendas.service';
import { PaginationResponse } from 'src/app/models/response/paginacao-response';
import { ActivatedRoute } from '@angular/router';
import { PaginationRequest } from 'src/app/models/request/pagination-request';

declare const $: any;

@Component({
    selector: 'app-lista-agendas',
    templateUrl: './lista-agendas.component.html',
    styleUrls: ['./lista-agendas.component.css']
})
export class ListaAgendasComponent implements OnInit {

    // Classe responsável por listar todas as agendas compaginação
    agendas: AgendaResponse[];

    constructor(
        private agendaService: AgendasService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        this.buscaAgendas();
    }

    buscaAgendas() {

        this.route.data.subscribe((data: { agendasResponse: PaginationResponse<AgendaResponse> }) => {

            if (data.agendasResponse) {
                this.agendas = data.agendasResponse.itemsList;
            }
        }, (err) => {
            console.log(err.rejection);
        });
    }
}