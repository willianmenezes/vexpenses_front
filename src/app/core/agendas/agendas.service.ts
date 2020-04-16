import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { URL_API } from 'src/app/app-api';
import { AgendaResponse } from 'src/app/models/agendaResponse';
import { PaginationResponse } from 'src/app/models/response/paginacao-response';
import { PaginationRequest } from 'src/app/models/request/pagination-request';
import { TipoAgendaResponse } from 'src/app/models/response/tipo-agenda-response';
import { RequestResponseType, RequestResponse } from 'src/app/models/response/request-response';
import { AgendaRequest } from 'src/app/models/request/agenda-request';

@Injectable({
    providedIn: 'root'
})
export class AgendasService {

    statusAgenda = new BehaviorSubject<boolean>(null);

    constructor(private http: HttpClient) { }

    getAgendas(paginacao: PaginationRequest) {

        return this.http.post<PaginationResponse<AgendaResponse>>(URL_API + 'agenda/paginacao', { ...paginacao });
    }

    buscarTiposAgenda() {
        return this.http.get<RequestResponseType<TipoAgendaResponse[]>>(`${URL_API}tipoagenda`, { observe: 'body' });
    }

    cadastrarAgenda(agenda: AgendaRequest) {
        return this.http.post<RequestResponse>(`${URL_API}agenda`, { ...agenda }, { observe: 'body' })
    }

    excluirAgenda(agendaId: string) {
        return this.http.delete<RequestResponse>(`${URL_API}agenda/${agendaId}`, { observe: 'body' });
    }

    getStatusAgenda(){
        return this.statusAgenda.asObservable();
    }

    setStatusAgenda(){
        this.statusAgenda.next(true);
    }
}