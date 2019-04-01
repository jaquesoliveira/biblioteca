import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivroComponent } from './livro.component';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { PesquisaLivroComponent } from './pesquisa-livro/pesquisa-livro.component';
import { LivroService } from './livro.service';


const ROUTES: Routes = [
    {path: '', component: PesquisaLivroComponent},
    {path: 'new', component: FormularioComponent},
    {path: ':id/edit', component: FormularioComponent}  
]

@NgModule({
    declarations:[
        LivroComponent,
        FormularioComponent,
        PesquisaLivroComponent

    ],
    imports: [
        RouterModule.forChild(ROUTES),  
        FormsModule,
        ReactiveFormsModule,
        CommonModule],

  
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, LivroService]

})

export class LivroModule{

}