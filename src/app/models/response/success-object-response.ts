export interface SuccessObjectResponse{

    autenticado: boolean;
    criado: Date;
    expiration: Date;
    accessToken: string;
    refreshToken: string;
    mensagem: string;
}