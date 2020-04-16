export interface EnderecoResponse {
    enderecoId: string,
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    status: boolean
}