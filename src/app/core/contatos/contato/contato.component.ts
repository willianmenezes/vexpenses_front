import { Component, Input, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import * as $ from 'jquery';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

    @Input() contatoInput: ContatoResponse;
    statusCard = false;

    constructor(private renderer: Renderer2) { }

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

    
}