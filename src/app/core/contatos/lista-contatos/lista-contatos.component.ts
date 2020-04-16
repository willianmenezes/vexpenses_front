import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as  alertfy from 'alertifyjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ContatosService } from '../contatos.service';
import { RequestResponseType, RequestResponse } from 'src/app/models/response/request-response';
import { ContatoResponse } from 'src/app/models/response/contato-response';
import { ContatoRequest } from 'src/app/models/request/contato-request';
import { TipoTelefoneResponse } from 'src/app/models/response/tipo-telefone-response';
import { EnderecoRequest } from 'src/app/models/request/endereco-request';
import { TelefoneRequest } from 'src/app/models/request/telefone-request';

declare const $: any;

@Component({
    selector: 'app-lista-contatos',
    templateUrl: './lista-contatos.component.html',
    styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

    contatos: ContatoResponse[];
    tiposTelefone: TipoTelefoneResponse[];
    listaEnderecos: EnderecoRequest[] = [];
    listaTelefones: TelefoneRequest[] = [];

    mostrarContato: boolean = true;
    mostrarEndereco: boolean = false;
    mostrarTelefone: boolean = false;
    idContatoCadastrado: string;
    listaEnderecosString: string;
    listaTelefonesString: string;
    formCadastrarContato: FormGroup;
    formCadastrarEndereco: FormGroup;
    formCadastrarTelefone: FormGroup;
    habilitaSalvarEndereco: boolean = false;
    habilitaSalvarTelefone: boolean = false;

    constructor(
        private fb: FormBuilder,
        private contatosService: ContatosService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.contatosService
            .getStatusContato()
            .subscribe((response) => {
                if (response == true) {
                    this.buscarContatos();
                }
            })
     }


    ngOnInit(): void {

        this.formCadastrarContato = this.fb.group({
            nome: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(200)
                ]
            ],
            sobrenome: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
            email: ['',
                [
                    Validators.maxLength(200),
                    Validators.email
                ]
            ]
        });

        this.formCadastrarEndereco = this.fb.group({
            cep: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]
            ],
            logradouro: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
            complemento: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
            bairro: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
            localidade: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
            uf: ['',
                [
                    Validators.maxLength(200)
                ]
            ],
        });

        this.formCadastrarTelefone = this.fb.group({
            ddd: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)
                ]
            ],
            numero: ['',
                [
                    Validators.required,
                    Validators.maxLength(9),
                    Validators.minLength(8)
                ]
            ],
            tipoTelefoneId: ['',
                [
                    Validators.required,
                ]
            ]
        });

        this.buscarContatos();
    }

    buscarContatos() {
        this.contatosService
            .getContatosByAgenda(this.activatedRoute.snapshot.params.id)
            .subscribe((response: RequestResponseType<ContatoResponse[]>) => {

                if (response.response.length > 0) {
                    this.contatos = response.response;

                    console.log(this.contatos);

                } else {
                    alertfy.warning('Não existem contatos para serem exibidos');
                    this.contatos = [];
                }

            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }

    cadastrarContato() {

        let agenda: ContatoRequest = this.formCadastrarContato.getRawValue();
        agenda.agendaId = this.activatedRoute.snapshot.params.id;

        console.log(agenda);

        this.contatosService
            .cadastrarContato(agenda)
            .subscribe((response: RequestResponseType<string>) => {
                if (response) {
                    this.idContatoCadastrado = response.response;
                    this.mostrarContato = false;
                    this.mostrarEndereco = true;
                    this.buscarContatos();
                    alertfy.success('Contato cadastrado com sucesso');
                } else {
                    alertfy.error('Erro ao cadastrar contato, verifique os dados e tente novamente');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }

    cadastrarEndereco() {

        this.contatosService
            .cadastrarEnderecos(this.listaEnderecos, this.idContatoCadastrado)
            .subscribe((response) => {
                if (response) {
                    alertfy.success('Endereços cadastrados com sucesso');
                    this.mostrarEndereco = false;
                    this.mostrarTelefone = true;
                    this.buscarContatos();
                    this.buscarTipoTelefone();
                } else {
                    alertfy.error('Erro ao cadastrar enderecos');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }

    cadastrarTelefone() {

        this.contatosService
            .cadastrarTelefones(this.listaTelefones, this.idContatoCadastrado)
            .subscribe((response) => {
                if (response) {
                    alertfy.success('Telefones cadastrados com sucesso');
                    $('modalCadastrarContato').modal('hide')
                   
                    this.limparClassesErros();

                    this.buscarContatos();
                } else {
                    alertfy.error('Erro ao cadastrar telefones');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });



    }

    limparClassesErros() {

        $('modalCadastrarContato').modal('hide');

        this.formCadastrarContato.reset();
        this.formCadastrarEndereco.reset();
        this.formCadastrarTelefone.reset();

        setTimeout(() => {
            this.mostrarContato = true;
            this.mostrarEndereco = false;
            this.mostrarTelefone = false
        }, 500)
    }

    adicioanrEndereco() {

        let endereco: EnderecoRequest = this.formCadastrarEndereco.getRawValue();

        this.listaEnderecos.push(endereco);

        this.listaEnderecosString = this.listaEnderecos.map((item) => {
            return `CEP: ${item.cep}`
        }).join(', ')

        if (this.listaEnderecos.length > 0) {
            this.habilitaSalvarEndereco = true;
        }
    }

    adicioanrTelefone() {

        let telefone: TelefoneRequest = this.formCadastrarTelefone.getRawValue();

        this.listaTelefones.push(telefone);

        this.listaTelefonesString = this.listaTelefones.map((item) => {
            return `Telefone: (${item.ddd}) ${item.numero}`
        }).join(', ')

        if (this.listaTelefonesString.length > 0) {
            this.habilitaSalvarTelefone = true;
        }
    }

    buscarTipoTelefone() {
        this.contatosService
            .buscarTiposTelefone()
            .subscribe((response) => {
                if (response) {
                    this.tiposTelefone = response.response;
                } else {
                    alertfy.error('Erro ao buscar tipos de telefone');
                }
            }, (err: HttpErrorResponse) => {
                alertfy.error(err.error.mensagem);
                console.log(err);
            });
    }

    buscarEnderecoCep(cep) {
        if (cep.length === 8) {
            this.contatosService
                .buscarEnderecoCep(cep)
                .subscribe((response) => {
                    if (response) {
                        this.formCadastrarEndereco.get('bairro').setValue(response.response.bairro)
                        this.formCadastrarEndereco.get('logradouro').setValue(response.response.logradouro)
                        this.formCadastrarEndereco.get('complemento').setValue(response.response.complemento)
                        this.formCadastrarEndereco.get('localidade').setValue(response.response.localidade)
                        this.formCadastrarEndereco.get('uf').setValue(response.response.uf)
                    }
                }, (err: HttpErrorResponse) => {
                    alertfy.error(err.error.mensagem);
                    console.log(err);
                });

        }
    }
}