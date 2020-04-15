import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    //verifica de existe um token(usuário logado), caso exista não deixa ir para a tela de login
    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.isLogged()) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }

}