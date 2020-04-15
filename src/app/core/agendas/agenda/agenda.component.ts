import { Component, Input } from '@angular/core';

import { AgendaResponse } from 'src/app/models/agendaResponse';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
    // recebe os dados do pai de uma sala para usar no template
    @Input() agendaInput: AgendaResponse ;

    constructor() { }

    ngOnInit(): void {
        console.log(this.agendaInput);
    }
}