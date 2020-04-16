import { Component, OnInit } from '@angular/core';
import * as  alertfy from 'alertifyjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AgendaResponse } from 'src/app/models/agendaResponse';
import { AgendasService } from '../agendas.service';
import { PaginationResponse } from 'src/app/models/response/paginacao-response';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoAgendaResponse } from 'src/app/models/response/tipo-agenda-response';
import { RequestResponseType, RequestResponse } from 'src/app/models/response/request-response';
import { AgendaRequest } from 'src/app/models/request/agenda-request';
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
    agendas$: Observable<AgendaResponse[]>;
    tiposAgenda: TipoAgendaResponse[];
    formCadastrar: FormGroup;

    constructor(
        private agendaService: AgendasService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.formCadastrar = this.fb.group({
            nome: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
            descricao: ['', [Validators.maxLength(200)]],
            tipoAgendaId: ['', [Validators.required]]
        })

        this.buscaAgendasRotas();
        this.buscarTiposAgenda();
    }

    buscaAgendasRotas() {

        this.route.data.subscribe((data: { agendasResponse: PaginationResponse<AgendaResponse> }) => {

            if (data.agendasResponse) {
                this.agendas = data.agendasResponse.itemsList;
            } else {
                alertfy.warning('Não existem agendas para serem exibidas');
            }
        }, (err: HttpErrorResponse) => {
            alertfy.error(err.error.mensagem);
            console.log(err);
        });
    }

    buscaAgendas() {

        let paginationRequest: PaginationRequest = {
            pageIndex: 1,
            pageSize: 10
        }

        this.agendaService
            .getAgendas(paginationRequest)
            .subscribe((response: PaginationResponse<AgendaResponse>) => {

                if (response) {
                    this.agendas = response.itemsList;
                } else {
                    alertfy.warning('Não existem agendas para serem exibidas');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }

    buscarTiposAgenda() {
        this.agendaService
            .buscarTiposAgenda()
            .subscribe((response: RequestResponseType<TipoAgendaResponse[]>) => {

                if (response.response) {
                    this.tiposAgenda = response.response;

                    console.log(this.tiposAgenda);

                } else {
                    alertfy.warning('Não existem tipos de agendas para serem exibidos');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err)
            });
    }

    cadastrarAgenda() {

        let agenda: AgendaRequest = this.formCadastrar.getRawValue();

        console.log(agenda);

        this.agendaService
            .cadastrarAgenda(agenda)
            .subscribe((response: RequestResponse) => {
                if (response) {
                    this.buscaAgendas();
                    alertfy.success('Agenda cadastrada com sucesso');
                    this.formCadastrar.reset();
                    $('#modalCadastrarAgenda').modal('hide');
                } else {
                    alertfy.error('Erro ao cadastrar agenda, verifique os dados e tente novamente');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }
}