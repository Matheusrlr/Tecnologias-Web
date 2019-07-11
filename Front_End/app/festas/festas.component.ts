import { Component, OnInit } from '@angular/core';
import { Festa } from './festa';
import { FestaService } from '../festa.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-festas',
  templateUrl: './festas.component.html',
  styleUrls: ['./festas.component.css']
})
export class FestasComponent implements OnInit {

  festas: Festa[];
  festaSelecionado: Festa;
  festaNovo: Festa;
  constructor(private festaService: FestaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadFestas();
  }
  editar(festa: Festa, content): void {

    this.festaSelecionado = festa;

    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-festa'})
      .result.then((festaForm: NgForm) => {
        this.festaSelecionado.nome = festaForm.value.nome;
        this.festaSelecionado.tipo = festaForm.value.tipo;
        this.festaSelecionado.data = festaForm.value.data;
        this.festaSelecionado.valor = festaForm.value.valor;
        this.festaSelecionado.quantidade_ingressos = festaForm.value.quantidade_ingressos;
        this.festaSelecionado.horario = festaForm.value.horario;
        console.log(this.festaSelecionado);
        this.salvar(this.festaSelecionado);
    });
  }

  loadFestas(): void {
    this.festaService.getFesta().subscribe(
      festas => this.festas = festas
    );
  }

  selecionarFesta(festa: Festa): void {
    this.festaSelecionado = festa;
  }

  salvar(festa: Festa): void {
    this.festaService.atualizarFesta(festa).subscribe();
  }

  apagar(festa: Festa): void {
    this.festaService.apagarFesta(festa).subscribe();
    this.festas = this.festas.filter(a => a !== festa);
  }

  adicionar(content): void {
    this.festaNovo = new Festa();

    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-festa'})
      .result.then((festaFormAdidionar: NgForm) => {
      this.salvarNovoFesta(this.festaNovo);
      this.festas.push(this.festaNovo);
    });
  }

  cancelar(): void {
    this.festaNovo = null;
  }

  salvarNovoFesta(festa: Festa): void {
    this.festaService.adicionar(festa).subscribe();
  }
}
