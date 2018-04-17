import * as firebase from 'firebase';

export class Bd {
  public publicar(publicacao: any): void {

    const nomeImagem = Date.now();

    firebase.storage().ref()
      .child(`images/${nomeImagem}`)
      .put(publicacao.imagem);

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    // .push( { titulo: publicacao.titulo } );
  }
}
