import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

    public token_id: string;
    public emailInvalid = false;
    public passwordInvalid = false;

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((res: any) => {

                // remover a senha do attr senha do objeto usario
                delete usuario.senha

                // registrando dados complementares do usuario path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })

                // ecrypt 64 btoa('string')
                // decrypt to string atoa('ZmFiaW9ndWVsZml1bml4QGdtYWlsLmNvbQ==')

            })
            .catch((err) => console.log(err))
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, senha)
            .then((res) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.router.navigate(['/home']);
                    })
            })
            .catch((err) => {
                err.code === 'auth/invalid-email' ? this.emailInvalid = true : this.emailInvalid = false;
                err.code === 'auth/wrong-password' ? this.passwordInvalid = true : this.passwordInvalid = false;
            })
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken');
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined

    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/']);
            });
    }

}