import { Editora } from '../editora/editora.model';
import { Autor } from '../autor/autor.model';

export class Livro{   

    constructor(
        public livSeqLivro?: number,
        public livCodBarrasLivro?: number,
        public livTitulo?: string,
        public livDscLivro?: string,
        public livAnoEdicaoLivro?: string,
        public livEditora?: string,
        public ctlSeqCategoriaLivro?: Number,        
        public livFlgLido?: boolean,
        public livFlgLiteraturaEstrangeira?: boolean,
        public livPaginasLivro?: number,
        public lstAutor?: Autor[]
        ){}
}