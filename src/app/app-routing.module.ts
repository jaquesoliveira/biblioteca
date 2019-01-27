import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorComponent } from './autor/autor.component';
import { PesquisarAutorComponent } from './autor/pesquisar-autor/pesquisar-autor.component';
import { CadastrarAutorComponent } from './autor/cadastrar-autor/cadastrar-autor.component';

const routes: Routes = [  
  {path: 'autor', component: PesquisarAutorComponent},
  {path: 'autor/new', component: CadastrarAutorComponent},
  {path: 'autor/:id/edit', component: CadastrarAutorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
