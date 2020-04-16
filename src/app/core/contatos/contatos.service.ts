import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestResponse, RequestResponseType } from 'src/app/models/response/request-response';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import { URL_API } from 'src/app/app-api';
import { ContatoRequest } from 'src/app/models/request/contato-request';
import { TipoTelefoneResponse } from 'src/app/models/response/tipo-telefone-response';
import { EnderecoRequest } from 'src/app/models/request/endereco-request';
import { TelefoneRequest } from 'src/app/models/request/telefone-request';
import { EnderecoResponse } from 'src/app/models/response/endereco-response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContatosService {

    statusContato = new BehaviorSubject<boolean>(null);

    constructor(private http: HttpClient) { }

    getContatosByAgenda(agendaId: string) {
        return this.http.get<RequestResponseType<ContatoResponse[]>>(`${URL_API}contato?agendaId=${agendaId}`, { observe: 'body' });
    }

    cadastrarContato(contato: ContatoRequest) {
        return this.http.post<RequestResponseType<string>>(`${URL_API}contato`, { ...contato }, { observe: 'body' });
    }

    buscarTiposTelefone() {
        return this.http.get<RequestResponseType<TipoTelefoneResponse[]>>(`${URL_API}tipotelefone`, { observe: 'body' });
    }

    cadastrarEnderecos(enderecos: EnderecoRequest[], contatoId: string) {

        return this.http.post<RequestResponse>(`${URL_API}endereco/${contatoId}`, enderecos, { observe: 'body' });
    }

    cadastrarTelefones(telefones: TelefoneRequest[], contatoId: string) {

        return this.http.post<RequestResponse>(`${URL_API}telefone/${contatoId}`, telefones, { observe: 'body' });
    }

    buscarEnderecoCep(cep: string){
        return this.http.get<RequestResponseType<EnderecoResponse>>(`${URL_API}endereco/${cep}`, { observe: 'body' });
    }

    excluirContato(contatoId: string) {
        return this.http.delete<RequestResponse>(`${URL_API}contato/${contatoId}`, { observe: 'body' });
    }

    setStatusContato(){
        this.statusContato.next(true);
    }

    getStatusContato(){
        return this.statusContato.asObservable();
    }   
}