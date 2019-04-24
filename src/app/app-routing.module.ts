import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'autor', loadChildren: './pages/autor/autor.module#AutorModule'},
  {path: 'editora', loadChildren: './pages/editora/editora.module#EditoraModule'},
  {path: 'livro', loadChildren: './pages/livro/livro.module#LivroModule'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
