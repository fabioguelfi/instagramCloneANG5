import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

  constructor(private progresso: Progresso) { }

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((response: any) => {

        const nomeImagem = response.key;

        firebase.storage().ref()
          .child(`images/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            // acompanhamento do progresso do upload
            (snapshot: any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
              // console.log(snapshot);
            },
            // acao caso erro
            (err: any) => {
              this.progresso.status = 'erro';
              // console.log(err);
            },
            () => {
              // finalizacao processo
              this.progresso.status = 'concluido';
            }
          );

      });
  }

  public consultaPublicacoes(emailUsuario: string): any {
    firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
    .once('value')
    .then((snapshot: any) => {
      console.log(snapshot.val());
    });
  }
}
