import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Editora } from './editora.model';
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

export class EditoraService{

  private apiPath: string = "rest/editoras"
    
    constructor(private http: HttpClient){}

    getAll(): Observable<Editora[]>{        

        return this.http.get<Editora[]>(`${environment.apiUrl}/${this.apiPath}`)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToEditoras)
        )
    }

    

    getById(id: number): Observable<Editora>{
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`

        return this.http.get(url)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToEditora)
        )
    }

    create(editora: Editora): Observable<Editora> {

        return this.http.post(`${environment.apiUrl}/${this.apiPath}`, editora, httpOptions)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToEditora)
        )
    }

    filtrar(editora: Editora): Observable<Editora[]>{

        return this.http.post(`${environment.apiUrl}/${this.apiPath}/filtrar`,  editora, httpOptions)
        .pipe(catchError(
            this.handlerError),
            map(this.jsonDataToEditoras)
        )
    }

    update(editora: Editora): Observable<Editora> {

        const url = `${environment.apiUrl}/${this.apiPath}/${editora.edtSeqEditora}`

        return this.http.put<Editora>(url, editora)
        .pipe(catchError(
            this.handlerError), 
            map(this.jsonDataToEditora)
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

    private jsonDataToEditoras(jsonData: any[]): Editora[]{
        const editoras: Editora[] = [];
        jsonData.forEach(element => editoras.push(element as Editora))
        //console.log(editoras)
        return editoras;
    }

    private handlerError(error: any): Observable<any>{
        //console.log(error);
        return throwError(error.error);
    }

    private jsonDataToEditora(jsonData: any): Editora{
        return jsonData as Editora;
    }

}