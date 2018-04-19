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

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // consultar publicacoes
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val());

          const publicacoes: Array<any> = [];

          snapshot.forEach((childSnapShot: any) => {
            const publicacao = childSnapShot.val();
            publicacao.key = childSnapShot.key;
            publicacoes.push(publicacao);
          });
          return publicacoes.reverse();
        })
        .then((publicacoes: any) => {

          publicacoes.forEach(publicacao => {

            // consulta a url da imagem(storage)
            firebase.storage().ref()
              .child(`images/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {

                publicacao.url_imagem = url;

                // consultar o nome do usuario
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .orderByKey()
                  .once('value')
                  .then((snapShot: any) => {
                    publicacao.nome_usuario = snapShot.val().usuario.nome_usuario;
                  });
              });
          });

          // console.log(publicacoes);
          resolve(publicacoes);

        });

    });
  }
}



