import { TipoAgendaResponse } from './tipoAgendaResponse';

export interface AgendaResponse {
    agendaId : string,
    nome: string,
    descricao: string,
    tipoAgendaId: string,
    pessoaId: string,
    status: boolean
    tipoAgenda: TipoAgendaResponse
}