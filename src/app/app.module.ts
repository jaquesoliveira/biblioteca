import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorComponent } from './autor/autor.component';
import { AutorService } from './autor/autor.service';
import { HttpClientModule } from '@angular/common/http';
import { PesquisarAutorComponent } from './autor/pesquisar-autor/pesquisar-autor.component';
import { CadastrarAutorComponent } from './autor/cadastrar-autor/cadastrar-autor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AutorComponent,
    PesquisarAutorComponent,
    CadastrarAutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AutorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
