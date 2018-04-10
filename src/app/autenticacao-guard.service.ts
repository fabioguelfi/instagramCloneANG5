import { Autenticacao } from './autenticacao.service';
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticao: Autenticacao) { }

    canActivate(): boolean {
        return this.autenticao.autenticado()
    }
}