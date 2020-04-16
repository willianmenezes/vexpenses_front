import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as  alertfy from 'alertifyjs';

import { ContatosService } from '../contatos.service';
import { RequestResponseType } from 'src/app/models/response/request-response';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-lista-contatos',
    templateUrl: './lista-contatos.component.html',
    styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

    contatos: ContatoResponse[];

    constructor(
        private contatosService: ContatosService,
        private activatedRoute: ActivatedRoute,
    ) { }


    ngOnInit(): void {
        this.contatosService
            .getContatosByAgenda(this.activatedRoute.snapshot.params.id)
            .subscribe((response: RequestResponseType<ContatoResponse[]>) => {

                if (response.response.length > 0) {
                    this.contatos = response.response;

                    console.log(this.contatos);

                } else {
                    alertfy.warning('Não existem contatos para serem exibidos');
                }

            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }
}