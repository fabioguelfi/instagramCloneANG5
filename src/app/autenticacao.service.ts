import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {

    public cadastrarUsuario(usuario: Usuario): void {
        console.log('chegamos ate o servico', usuario)
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((res: any) => {

                // remover a senha do attr senha do objeto usario
                delete usuario.senha

                // registrando dados complementares do usuario path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })

            })
            .catch((err) => console.log(err))   
    }

}