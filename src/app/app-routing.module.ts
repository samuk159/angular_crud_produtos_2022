import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaDeProdutosComponent } from './lista-de-produtos/lista-de-produtos.component';
import { FormularioProdutoComponent } from './formulario-produto/formulario-produto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ListaDeProdutosComponent },
  { path: 'produtos/novo', component: FormularioProdutoComponent },
  { path: 'produtos/:indice', component: FormularioProdutoComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
