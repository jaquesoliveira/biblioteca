
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

//import {ROOT_PATH} from '../app.api';
import { environment } from 'src/environments/environment';
import { Livro } from './Livro.model';



const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json'
            ,'Access-Control-Allow-Origin': '*'  
        }//
    ),
    body: null
  };

@Injectable({
    providedIn: 'root',
  })
export class LivroService{
    private apiPath: string = "rest/livros"
    private apiIsbn: string = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
    
    constructor(private http: HttpClient){}

    getAll(): Observable<Livro[]>{
        

        return this.http.get<Livro[]>(`${environment.apiUrl}/${this.apiPath}`)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutores)
        )
    }

    

    getById(id: number): Observable<Livro>{
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`

        return this.http.get(url)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutor)
        )
    }

    create(autor: Livro): Observable<Livro> {

        return this.http.post(`${environment.apiUrl}/${this.apiPath}`, autor, httpOptions)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToAutor)
        )
    }

    filtrar(autor: Livro): Observable<Livro[]>{

        return this.http.post(`${environment.apiUrl}/${this.apiPath}/filtrar`,  autor, httpOptions)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutores)
        )
    }

    update(livro: Livro): Observable<Livro> {

        const url = `${environment.apiUrl}/${this.apiPath}/${livro.livSeqLivro}`

        //console.log(livro);

         return this.http.put<Livro>(url, livro)
         .pipe(catchError(
             this.handlerError), 
             map(this.jsonDataToAutor)
         )
       // return null;
    }

    delete(id: number): Observable<any>{
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`

        return this.http.delete(url)
        .pipe(catchError(
            this.handlerError),
            map(() => null)
        )
    }

    pesquisarPorIsbn(barCode: string): Observable<any>{
        console.log(`Barcode: ${this.apiIsbn}${barCode}`);
        const pathIsbn = `${this.apiIsbn}${barCode}`

        return this.http.get(pathIsbn);        
    }

    pesquisarPorIsbnDetalhe(selfLink: string): Observable<any>{
        console.log(`Selflink: ${selfLink}`);
        const pathIsbn = selfLink
        return this.http.get(pathIsbn);        
    }

    private jsonDataToAutores(jsonData: any[]): Livro[]{
        const autores: Livro[] = [];
        jsonData.forEach(element => autores.push(element as Livro))
        return autores;
    }

    private handlerError(error: any): Observable<any>{
        //console.log(error);
        return throwError(error.error);
    }

    private jsonDataToAutor(jsonData: any): Livro{
        return Object.assign(new Livro(), jsonData) //jsonData as Livro;
    }
}