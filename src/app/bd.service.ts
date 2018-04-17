import * as firebase from 'firebase';

export class Bd {
  public publicar(publicacao: any): void {

    const nomeImagem = Date.now();

    firebase.storage().ref()
      .child(`images/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        // acompanhamento do progresso do upload
        (snapshot: any) => console.log(snapshot),
        // acao caso erro
        (err: any) => console.log(),
        () => {
          // finalizacao processo
          console.log('upload completo');
        }
      );

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    // .push( { titulo: publicacao.titulo } );
  }
}
