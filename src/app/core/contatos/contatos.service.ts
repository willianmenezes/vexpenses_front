import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestResponse, RequestResponseType } from 'src/app/models/response/request-response';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import { URL_API } from 'src/app/app-api';

@Injectable({
    providedIn: 'root'
})
export class ContatosService {
    constructor(private http: HttpClient) { }

    getContatosByAgenda(agendaId: string) {
        return this.http.get<RequestResponseType<ContatoResponse[]>>(`${URL_API}contato?agendaId=${agendaId}`, { observe: 'body' });
    }
}