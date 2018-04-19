import { Autenticacao } from './../autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void {
    console.log('chegamos ate aqui');
  }

}
