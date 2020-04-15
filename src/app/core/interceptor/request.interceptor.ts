import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, flatMap } from 'rxjs/operators';

import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { LoadingService } from 'src/app/shared/loading/loafing.service';
import { URL_API } from 'src/app/app-api';
import { SuccessObjectResponse } from 'src/app/models/response/success-object-response';

declare const alertify: any;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenService.hasToken()) {

            const token = this.tokenService.getToken();

            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
            }

            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }

            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
            
            if (err.status == 401) {

                let user = this.userService.getUser();
                let expiration = this.tokenService.getExpiration();
                let refreshToken = this.tokenService.getRefreshToken();

                return this.http
                    .post(URL_API + 'AuthController',
                        { usuario: user.email, refreshToken, tipoConcessao: 'refresh_token', expiration },
                        { observe: 'response' }) 
                    .pipe(flatMap(response => {

                        var successObj = <SuccessObjectResponse>response.body.valueOf();

                        if (successObj && successObj.autenticado == true) {

                            this.userService.setToken(successObj.accessToken);
                            this.userService.setRefreshToken(successObj.refreshToken.toString());
                            this.tokenService.setExpiration(successObj.expiration.toString());

                            const cloneReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${successObj.accessToken}`) });

                            return next.handle(cloneReq);
                        } else {

                            this.tokenService.deleteToken();
                            this.router.navigate(['']);
                            alertify.warning("Sessão expirada. Realize o login novamente.");
                        }
                    }));

            } else if (err.status == 0 && err.statusText == "Unknown Error") {

                alertify.error('Servidor indisponível');
                this.loadingService.stop();
                this.tokenService.deleteToken();
                this.router.navigate(['']);
            } else {

                this.loadingService.stop();
                throw err;
            }
        }));
    }
}   