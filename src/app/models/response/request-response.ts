export interface RequestResponse {
    mensagem: string;
}

export interface RequestResponseType<T> extends RequestResponse{
    resposta : T;
}