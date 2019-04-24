
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Autor } from './autor.model';
import { element } from '@angular/core/src/render3';

//import {ROOT_PATH} from '../app.api';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
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

        return this.http.get<Autor[]>(`${environment.apiUrl}/${this.apiPath}`)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutores)
        )
    }
    

    getById(id: number): Observable<Autor>{
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`

        return this.http.get(url)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutor)
        )
    }

    create(autor: Autor): Observable<Autor> {

        return this.http.post(`${environment.apiUrl}/${this.apiPath}`, autor, httpOptions)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToAutor)
        )
    }

    filtrar(autor: Autor): Observable<Autor[]>{

        return this.http.post(`${environment.apiUrl}/${this.apiPath}/filtrar`,  autor, httpOptions)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToAutores)
        )
    }

    update(autor: Autor): Observable<Autor> {

        const url = `${environment.apiUrl}/${this.apiPath}/${autor.autSeqAutor}`

        return this.http.put<Autor>(url, autor)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToAutor)
        )
    }

    delete(id: number): Observable<any>{
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`

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
        return throwError(error.error);
    }

    private jsonDataToAutor(jsonData: any): Autor{
        return jsonData as Autor;
    }
}