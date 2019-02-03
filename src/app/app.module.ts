import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorComponent } from './autor/autor.component';
import { AutorService } from './autor/autor.service';
import { HttpClientModule } from '@angular/common/http';
//import { PesquisarAutorComponent } from './autor/pesquisar-autor/pesquisar-autor.component';
//import { CadastrarAutorComponent } from './autor/cadastrar-autor/cadastrar-autor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EditoraComponent } from './editora/editora.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    EditoraComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AutorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
