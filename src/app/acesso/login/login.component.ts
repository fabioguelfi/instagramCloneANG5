import { Autenticacao } from './../../autenticacao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'senha': new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autentica(): void {
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
  }

  public teste(): void {
    console.log(this.formulario.controls)
  }

}
