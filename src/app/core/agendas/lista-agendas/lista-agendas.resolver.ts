import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/response/paginacao-response';
import { AgendaResponse } from 'src/app/models/agendaResponse';
import { AgendasService } from '../agendas.service';
import { PaginationRequest } from 'src/app/models/request/pagination-request';

@Injectable({
    providedIn: 'root'
})
export class ListaAgendasResolver implements Resolve<PaginationResponse<AgendaResponse>>{

    constructor(private agendasService: AgendasService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): PaginationResponse<AgendaResponse> | Observable<PaginationResponse<AgendaResponse>> | Promise<PaginationResponse<AgendaResponse>> {

        let paginationRequest: PaginationRequest = {
            pageIndex: 1,
            pageSize: 10
        }

        return this.agendasService.getAgendas(paginationRequest);
    }
}