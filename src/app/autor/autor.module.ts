import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorComponent } from './autor.component';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarAutorComponent } from './pesquisar-autor/pesquisar-autor.component';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AutorService } from './autor.service';
import { CadastrarAutorComponent } from './cadastrar-autor/cadastrar-autor.component';


const ROUTES: Routes = [
    //{path: '', component: AutorComponent},
    {path: '', component: PesquisarAutorComponent},
    {path: 'new', component: CadastrarAutorComponent},
    {path: ':id/edit', component: CadastrarAutorComponent}  
]

@NgModule({
    declarations:[
        AutorComponent,
        PesquisarAutorComponent,
        CadastrarAutorComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),  
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
  
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AutorService],

})

export class AutorModule{

}