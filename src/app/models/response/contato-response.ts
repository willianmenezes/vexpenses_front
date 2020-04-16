import { EnderecoResponse } from './endereco-response';
import { TelefoneResponse } from './telefone-response';

export interface ContatoResponse{
    contatoId: string,
    nome: string,
    sobrenome: string, 
    email: string,
    status: boolean
    endereco: EnderecoResponse,
    telefone: TelefoneResponse
}