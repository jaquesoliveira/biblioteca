import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { EditoraComponent } from './editora.component';
import { FormComponent } from './form/form.component';
import { PesquisarEditoraComponent } from './pesquisar-editora/pesquisar-editora.component';
import { EditoraService } from './editora.service';


const ROUTES: Routes = [
    {path: '' , component: PesquisarEditoraComponent},
    {path: 'new', component: FormComponent},
    {path: ':id/edit', component: FormComponent}  
]

@NgModule({
    declarations:[
        EditoraComponent,
        FormComponent,
        PesquisarEditoraComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),  
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
  
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, EditoraService]

})

export class EditoraModule{

}