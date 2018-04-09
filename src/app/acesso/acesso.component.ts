import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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
    ]),
    trigger('animacaoPainel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('1.5s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.85, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.90, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.95, opacity: 1, transform: 'translateY(10px)' }),

          style({ offset: 1, opacity: 1, transform: 'translate(0)' })
        ])) // duracao, delay, e acelaracao 
      ])
    ])
  ]
})

export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado';
  public animacaoPainel = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false
  }

}
