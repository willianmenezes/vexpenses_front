import { Component, Input, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import * as $ from 'jquery';
import * as alertfy from 'alertifyjs';

import { ContatosService } from '../contatos.service';
import { RequestResponse } from 'src/app/models/response/request-response';
import { HttpErrorResponse } from '@angular/common/http/http';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

    @Input() contatoInput: ContatoResponse;
    statusCard = false;

    constructor(private renderer: Renderer2, private contatoService: ContatosService) { }

    ngOnInit(): void {

    }

    buscarDadosContato(div: HTMLElement) {

        if (this.statusCard == true) {
            this.renderer.addClass(div, 'd-none');
            this.statusCard = false;
        } else {
            this.renderer.removeClass(div, 'd-none');
            this.statusCard = true;
        }
    }

    excluiContato(contatoId: string) {
        
        this.contatoService
        .excluirContato(contatoId)
        .subscribe((response: RequestResponse) => {
            if (response) {
                this.contatoService.setStatusContato();
                alertfy.success('Contato excluido com sucesso');
            } else {
                alertfy.error('Erro ao excluir contato');
            }
        }, (err: HttpErrorResponse) => {
            alertfy.error(err.error.mensagem);
            console.log(err);
        });
    }
}