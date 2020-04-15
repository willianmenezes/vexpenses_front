import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from 'src/app/app-api';
import { AgendaResponse } from 'src/app/models/agendaResponse';
import { PaginationResponse } from 'src/app/models/response/paginacao-response';
import { PaginationRequest } from 'src/app/models/request/pagination-request';

@Injectable({
    providedIn: 'root'
})
export class AgendasService {

    constructor(private http: HttpClient) { }

    getAgendas(paginacao: PaginationRequest) {

        return this.http.post<PaginationResponse<AgendaResponse>>(URL_API + 'agenda/paginacao', { ...paginacao });
    }
}