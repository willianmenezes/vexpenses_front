import { TipoAgendaResponse } from './response/tipo-agenda-response';

export interface AgendaResponse {
    agendaId : string,
    nome: string,
    descricao: string,
    tipoAgendaId: string,
    pessoaId: string,
    status: boolean
    tipoAgenda: TipoAgendaResponse
}