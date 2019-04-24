import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorComponent } from './pages/autor/autor.component';
import { AutorService } from './pages/autor/autor.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { EditoraComponent } from './pages/editora/editora.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';
import {PagesModule} from './pages/pages.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {NgAutoCompleteModule} from "ng-auto-complete";


@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent, ErrorMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    CoreModule,
    SharedModule
  ],
  exports:[BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgAutoCompleteModule,
    ReactiveFormsModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
