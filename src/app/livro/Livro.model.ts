import { Editora } from '../editora/editora.model';
import { Autor } from '../autor/autor.model';

export class Livro{   

    constructor(
        public livSeqLivro?: number,
        public livCodBarrasLivro?: number,
        public livTitulo?: string,
        public livDscLivro?: string,
        public livAnoEdicaoLivro?: string,
        public edtSeqEditora?: Editora,
        public ctlSeqCategoriaLivro?: Editora,        
        public flgLido?: boolean,
        public livFlgLiteraturaEstrangeira?: number,
        public livPaginasLivro?: boolean,
        public lstAutor?: Autor[]
        ){}
}