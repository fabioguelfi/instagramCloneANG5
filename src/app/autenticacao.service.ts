import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {

    public cadastrarUsuario(usuario: Usuario): void {
        console.log('chegamos ate o servico', usuario)
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((res: any) => console.log(res))
            .catch((err) => console.log(err))
    }

}