import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContatosService } from '../contatos.service';
import { RequestResponseType } from 'src/app/models/response/request-response';
import { ContatoResponse } from 'src/app/models/response/contato-response';

@Component({
    selector: 'app-lista-contatos',
    templateUrl: './lista-contatos.component.html',
    styleUrls: ['./lista-contatos.component..css']
})
export class ListaContatosComponent implements OnInit{

    constructor(
        private contatosService: ContatosService,
        private activatedRoute: ActivatedRoute,
    ){}


    ngOnInit(): void {
        this.contatosService
            .getContatosByAgenda(this.activatedRoute.snapshot.params.id)
            .subscribe((response: RequestResponseType<ContatoResponse[]>) => {
                console.log(response);
            }, (err) => {
                console.log(err)
            })
    }
}