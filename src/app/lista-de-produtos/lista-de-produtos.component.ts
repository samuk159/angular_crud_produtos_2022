import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.scss']
})
export class ListaDeProdutosComponent implements OnInit {

  /*@Input() lista: Produto[];
  @Output() edita = new EventEmitter();
  @Output() exclui = new EventEmitter();*/

  produtos: Produto[] = [];
  indiceExclusao = -1;
  modalExclusao: BsModalRef;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private servico: ProdutoService
  ) {
  }

  ngOnInit(): void {
    this.produtos = this.servico.getProdutos();
  }

  excluir(indice: number) {
    console.log(indice);
    this.servico.excluir(indice);
    this.toast.warning('Excluido');
  }

  abrirModalExc(template: TemplateRef<any>, indice: number) {
    this.indiceExclusao = indice;
    this.modalExclusao = this.modalService.show(template);
  }

  fecharModalExc(excluir: boolean) {
    this.modalExclusao.hide();

    if (excluir) {
      this.excluir(this.indiceExclusao);
    }
  }

}
