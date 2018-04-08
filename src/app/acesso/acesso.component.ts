import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacaoBanner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 1s ease-in-out') // duracao, delay, e acelaracao 
      ])
    ])
  ]
})

export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado'

  constructor() { }

  ngOnInit() {
  }

}
