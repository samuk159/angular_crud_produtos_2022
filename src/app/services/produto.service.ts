import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private dados: Produto[] = [];

  constructor() {
    let camiseta = new Produto('Camiseta', 50.99);
    this.dados.push(camiseta);
    this.dados.push(new Produto('Tênis', 300.99));
  }

  getProdutos() {
    return this.dados;
  }

  adicionar(dado: Produto) {
    this.dados.unshift(dado);
  }

  excluir(indice: number) {
    this.dados.splice(indice, 1);
  }

  getProdutoByIndex(indice: number) {
    return this.dados[indice];
  }

  editar(indice: number, produto: Produto) {
    this.dados[indice] = produto;
  }
}
