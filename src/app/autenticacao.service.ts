import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

    public token_id: string

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('chegamos ate o servico', usuario)
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
        console.log(email, senha)
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, senha)
            .then((res) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        this.router.navigate(['/home'])
                    })
                console.log(this.token_id)
            })
            .catch((err) => console.log(err))
    }

}