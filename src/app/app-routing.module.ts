import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'autor', loadChildren: './autor/autor.module#AutorModule'},
  {path: 'editora', loadChildren: './editora/editora.module#EditoraModule'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
