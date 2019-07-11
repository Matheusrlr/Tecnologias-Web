import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from '../empresa.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[];
  empresaSelecionado: Empresa;
  empresaNovo: Empresa;

  constructor(private empresaService: EmpresaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadEmpresas();
  }
  editar(empresa: Empresa, content): void {

    this.empresaSelecionado = empresa;

    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-empresa'})
      .result.then((empresaForm: NgForm) => {
        this.empresaSelecionado.nome = empresaForm.value.nome;
        this.empresaSelecionado.email = empresaForm.value.email;
        this.empresaSelecionado.cnpj = empresaForm.value.cnpj;
        this.empresaSelecionado.login = empresaForm.value.login;
        this.empresaSelecionado.senha = empresaForm.value.senha;
        console.log(this.empresaSelecionado);
        this.salvar(this.empresaSelecionado);
    });
  }

  loadEmpresas(): void {
    this.empresaService.getEmpresa().subscribe(
      empresas => this.empresas = empresas
    );
  }

  selecionarEmpresa(empresa: Empresa): void {
    this.empresaSelecionado = empresa;
  }

  salvar(empresa: Empresa): void {
    this.empresaService.atualizarEmpresa(empresa).subscribe();
  }

  apagar(empresa: Empresa): void {
    this.empresaService.apagarEmpresa(empresa).subscribe();
    this.empresas = this.empresas.filter(a => a !== empresa);
  }

  adicionar(content): void {
    this.empresaNovo = new Empresa();

    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-empresa'})
      .result.then((empresaFormAdidionar: NgForm) => {
      this.salvarNovoEmpresa(this.empresaNovo);
      this.empresas.push(this.empresaNovo);
    });
  }

  cancelar(): void {
    this.empresaNovo = null;
  }

  salvarNovoEmpresa(empresa: Empresa): void {
    this.empresaService.adicionar(empresa).subscribe();
  }
}


