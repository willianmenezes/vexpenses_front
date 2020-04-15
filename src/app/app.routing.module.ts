import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { LoginGuard } from './core/auth/login.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';
import { MenuAplicacao } from './core/menu-aplicacao/menu-aplicacao.component';
import { ListaAgendasComponent } from './core/agendas/lista-agendas/lista-agendas.component';
import { ListaAgendasResolver } from './core/agendas/lista-agendas/lista-agendas.resolver';
import { ListaContatosComponent } from './core/contatos/lista-contatos/lista-contatos.component';

// classe responsável por gerenciar as rotas da aplicação
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'home',
        component: MenuAplicacao,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'agendas',
                canActivate: [AuthGuard]
            },
            {
                path: 'agendas',
                component: ListaAgendasComponent,
                canActivate: [AuthGuard],
                resolve: { agendasResponse: ListaAgendasResolver }
            },
            {
                path: 'contatos/:id',
                component: ListaContatosComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}