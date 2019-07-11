import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from '../usuario.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarioSelecionado: Usuario;
  usuarioNovo: Usuario;

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  editar(usuario: Usuario, content): void {

    this.usuarioSelecionado = usuario;

    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-usuario'})
      .result.then((usuarioForm: NgForm) => {
        this.usuarioSelecionado.nome = usuarioForm.value.nome;
        this.usuarioSelecionado.email = usuarioForm.value.email;
        this.usuarioSelecionado.cpf = usuarioForm.value.cpf;
        this.usuarioSelecionado.login = usuarioForm.value.login;
        this.usuarioSelecionado.senha = usuarioForm.value.senha;
        console.log(this.usuarioSelecionado);
        this.salvar(this.usuarioSelecionado);
    });
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuario().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  selecionarUsuario(usuario: Usuario): void {
    this.usuarioSelecionado = usuario;
  }

  salvar(usuario: Usuario): void {
    this.usuarioService.atualizarUsuario(usuario).subscribe();
  }

  apagar(usuario: Usuario): void {
    this.usuarioService.apagarUsuario(usuario).subscribe();
    this.usuarios = this.usuarios.filter(a => a !== usuario);
  }

  adicionar(content): void {
    this.usuarioNovo = new Usuario();

    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-usuario'})
      .result.then((usuarioFormAdidionar: NgForm) => {
      this.salvarNovoUsuario(this.usuarioNovo);
      this.usuarios.push(this.usuarioNovo);
    });
  }

  cancelar(): void {
    this.usuarioNovo = null;
  }

  salvarNovoUsuario(usuario: Usuario): void {
    this.usuarioService.adicionar(usuario).subscribe();
}
}