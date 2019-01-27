
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Autor } from './autor.model';
import { element } from '@angular/core/src/render3';

import {ROOT_PATH} from '../app.api';

const httpOptions = {
    headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
    ),
    body: null
  };

@Injectable({
    providedIn: 'root',
  })
export class AutorService{
    private apiPath: string = "rest/autores"
    
    constructor(private http: HttpClient){}

    getAll(): Observable<Autor[]>{
        return this.http.get<Autor[]>(`${ROOT_PATH}/${this.apiPath}`)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutores)
        )
    }

    getById(id: number): Observable<Autor>{
        const url = `${ROOT_PATH}/${this.apiPath}/${id}`

        return this.http.get(url)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutor)
        )
    }

    create(autor: Autor): Observable<Autor> {

        return this.http.post(`${ROOT_PATH}/${this.apiPath}`, autor, httpOptions)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToAutor)
        )
    }

    update(autor: Autor): Observable<Autor> {

        const url = `${ROOT_PATH}/${this.apiPath}/${autor.autSeqAutor}`

        return this.http.put<Autor>(url, autor)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToAutor)
        )
    }

    delete(id: number): Observable<any>{
        const url = `${ROOT_PATH}/${this.apiPath}/${id}`

        return this.http.delete(url)
        .pipe(catchError(
            this.handlerError),
            map(() => null)
        )
    }

    private jsonDataToAutores(jsonData: any[]): Autor[]{
        const autores: Autor[] = [];
        jsonData.forEach(element => autores.push(element as Autor))
        return autores;
    }

    private handlerError(error: any): Observable<any>{
        console.log(error);
        return throwError(error);
    }

    private jsonDataToAutor(jsonData: any): Autor{
        return jsonData as Autor;
    }
}