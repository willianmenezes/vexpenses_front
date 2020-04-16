import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pessoa } from 'src/app/Models/Pessoa';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Token } from 'src/app/Models/token';
import * as  alertfy from 'alertifyjs';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            usuario: ['',
                [
                    Validators.required

                ]
            ],
            senha: ['',
                [
                    Validators.required
                ]
            ]
        });
    }

    login(): void {
        let pessoa: Auth = this.formLogin.getRawValue();

        this.authService
            .autenticacao(pessoa.usuario, pessoa.senha)
            .subscribe((response) => {

                let token: Token = response as Token;

                if (token.autenticado === true) {
                    // alertfy.success('Login realizado com sucesso.');
                    this.router.navigate(['home']);
                } else if (token.autenticado === false) {
                    alertfy.error('Usuário ou senha invalildos.');
                }

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

}