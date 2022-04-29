import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Produto } from './models/produto.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];
  //produto: Produto = new Produto(null, null);
  produto: Produto = new Produto('');
  indiceEdicao = -1;
  indiceExclusao = -1;
  modalExclusao: BsModalRef;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    public usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    let camiseta = new Produto('Camiseta', 50.99);
    this.produtos.push(camiseta);
    this.produtos.push(new Produto('Tênis', 300.99));
  }

  salvar() {
    //Validação
    if (!this.produto.nome) {
      console.log('Por favor informe o nome');
      this.toast.error('Por favor informe o nome');
      return;
    }

    if (!this.produto.preco) {
      console.log('Por favor informe o preço');
      this.toast.error('Por favor informe o preço');
      return;
    }

    this.produto.preco =
      Number(this.produto.preco.toString().replace(',', '.'));

    //Salva
    if (this.indiceEdicao == -1) {
      this.produtos.unshift(this.produto);
    } else {
      this.produtos[this.indiceEdicao] = this.produto;
    }

    //Limpa o formulário
    this.produto = new Produto();
    this.indiceEdicao = -1;
    this.toast.success('Salvo com sucesso');
  }

  excluir(indice: number) {
    console.log(indice);
    this.produtos.splice(indice, 1);
    this.toast.warning('Excluido');
  }

  editar(indice: number) {
    this.indiceEdicao = indice;

    this.produto = Object.assign(
      new Produto(), this.produtos[indice]
    );
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
