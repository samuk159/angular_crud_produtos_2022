import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent implements OnInit {

  produto: Produto = new Produto('');
  indiceEdicao = -1;

  constructor(
    private toast: ToastrService,
    private servico: ProdutoService,
    private router: Router,
    private rota: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //console.log(this.rota.params);
    this.rota.params.subscribe(parametros => {
      console.log(parametros);
      if (parametros.indice) {
        //Edição
        this.indiceEdicao = parametros.indice;
        this.produto = this.servico.getProdutoByIndex(this.indiceEdicao);
      } else {
        //Inclusão
      }
    });
  }

  salvar() {
    //Validação
    if (!this.produto.nome) {
      this.toast.error('Por favor informe o nome');
      return;
    }

    if (!this.produto.preco) {
      this.toast.error('Por favor informe o preço');
      return;
    }

    this.produto.preco =
      Number(this.produto.preco.toString().replace(',', '.'));

    //Salva
    if (this.indiceEdicao == -1) {
      this.servico.adicionar(this.produto);
    } else {
      this.servico.editar(this.indiceEdicao, this.produto);
    }

    //Limpa o formulário
    this.produto = new Produto();
    //this.indiceEdicao = -1;
    this.toast.success('Salvo com sucesso');
    this.router.navigate(['produtos']);
  }

}
