import { Component, OnInit, Input, ViewChild, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Livro } from '../Livro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { Editora } from 'src/app/pages/editora/editora.model';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { Autor } from 'src/app/pages/autor/autor.model';
import { AutorService } from 'src/app/pages/autor/autor.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit,  AfterContentChecked {

  currentAction: string;
  titulo: string;
  livroForm: FormGroup;  
  edtSeqEditora: FormGroup; 
  lstAutor: FormGroup;
  autores: string[] = []
  todosOsAutores: Autor[] = [];
  respIsbn: any = "";
  respIsbnDetalhes: any = "";
  respIsbnAuthors: any[] = [];
  alterarBarCode: boolean;
  inserirManualmente: boolean;
  imagePath: any;
  imgURL: any;
  smallThumbnail: any;
  respIsbnImages: any[] = [];
  @Input() nomeAutor: string
  
  @Input() livro: Livro = new Livro();

  //editora: Editora
  
  constructor(     
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService
    ) { }

  Selected(item: SelectedAutocompleteItem) {
      
  }  

  ngOnInit() {
    this.setCurrentAction();
    this.buildLivroForm();    
    this.loadLivro();
    this.inserirManualmente = false  
  }  

  ngAfterContentChecked(){    
    this.autores = this.livro.lstAutor

    // this.livroService.getAll().subscribe(
    //   livro => this.actionsForSuccess(),
    //   error => alert('Houve um erro!')     
    // );

    // this.autorService.getAll().subscribe(
    //   todosOsAutores => this.todosOsAutores = todosOsAutores,
    //   error => this.actionsForError(error)      
    // )

  }

  pesquisarIsbn(){
    const livro: Livro = Object.assign(new Livro(), this.livroForm.value);

    if(`${livro.livCodBarrasLivro}`!= ""){      

      this.livroService.pesquisarPorIsbn(`${livro.livCodBarrasLivro}`)
      .subscribe(
        data => {
          if(data != undefined){

            if(this.respIsbn = data.items != undefined){
              this.respIsbn = data.items[0].volumeInfo;
              this.respIsbnDetalhes = data.volumeInfo;
              livro.livTitulo = this.respIsbn.title
              livro.livSubTitulo = this.respIsbn.subtitle
              livro.livDscLivro = this.respIsbn.description
              livro.livPaginasLivro = this.respIsbn.pageCount
              livro.livEditora = this.respIsbn.publisher
              livro.livAnoEdicaoLivro = this.respIsbn.publishedDate
              
              if(this.respIsbn.imageLinks){
                if(this.respIsbn.imageLinks.thumbnail){
                this.imgURL = this.respIsbn.imageLinks.thumbnail
                livro.livImgLivro = this.imgURL
                }
              }

              if(this.respIsbn.imageLinks){
                if(this.respIsbn.imageLinks.smallThumbnail){
                  this.smallThumbnail = this.respIsbn.imageLinks.smallThumbnail
                  livro.livImgSmallLivro = this.smallThumbnail              
                }
              }

              this.respIsbnAuthors = this.respIsbn.authors
              livro.lstAutor = this.respIsbn.authors
              this.buildLivroForm();
              this.livroForm.patchValue(livro)
            }
            else{
              this.inserirManualmente = true
              toastr.info("Livro não localizado. Insira manualmente!")
              this.respIsbn = ['']
            }              
          }
      });
    }    
  }

  addAutor(nomeAutor: any){
    this.respIsbnAuthors.push(nomeAutor.value)
    this.livro.lstAutor = this.respIsbnAuthors
    this.livroForm.patchValue(this.livro)
  }

  excluirAutor(autor: any){
    const index = this.respIsbnAuthors.indexOf(autor);
    this.respIsbnAuthors.splice(index, 1);
    this.livro.lstAutor = this.respIsbnAuthors
    this.livroForm.patchValue(this.livro)
  }

  enviar(){
    const dadosFormulario = this.livroForm.value 

    const edtForm = new Livro(
      dadosFormulario.livSeqLivro,
      dadosFormulario.livCodBarrasLivro,
      dadosFormulario.livTitulo,
      dadosFormulario.livSubTitulo,
      dadosFormulario.livDscLivro,
      dadosFormulario.livAnoEdicaoLivro,
      dadosFormulario.livEditora,
      dadosFormulario.livCategoria,
      dadosFormulario.livFlgLido,
      dadosFormulario.livFlgLiteraturaEstrangeira,
      dadosFormulario.livPaginasLivro,
      dadosFormulario.lstAutor,
      this.imgURL,
      this.smallThumbnail
    );

    if( this.route.snapshot.url[0].path == "new"){
      
      const livro: Livro = Object.assign(new Livro(), edtForm);

      this.livroService.create(livro)
        .subscribe(
          livro => this.actionsForSuccess(),     
          error => this.actionsForError(error)     
        );
    }else{
      const id =  this.route.snapshot.url[0].path
      this.livroService.update(edtForm).subscribe(
        livro => this.actionsForSuccess(),
        error => alert('Houve um erro!')     
      );
    }    
  }

  //
  private setCurrentAction(){
    if( this.route.snapshot.url[0] != undefined){
      if( this.route.snapshot.url[0].path == "new"){
        this.currentAction = "new"
        this.titulo = "Cadastrar Livro"
        this.alterarBarCode = true
      }else{
        this.currentAction = "edit"
        this.titulo = "Alterar Livro"
        this.alterarBarCode = false
      }
    } 
  }

  private buildLivroForm(){
    this.livroForm = this.formBuilder.group({
      livSeqLivro: this.formBuilder.control(''),
      livCodBarrasLivro: this.formBuilder.control(''),
      livTitulo:  this.formBuilder.control(''),
      livSubTitulo:  this.formBuilder.control(''),
      livDscLivro:  this.formBuilder.control(''),
      livAnoEdicaoLivro:  this.formBuilder.control(''),
      livEditora:  this.formBuilder.control(''),
      livCategoria:  this.formBuilder.control(''),
      livFlgLido:  this.formBuilder.control(''),
      livFlgLiteraturaEstrangeira:  this.formBuilder.control(''),
      livPaginasLivro:  this.formBuilder.control(''),
      lstAutor: this.formBuilder.control(''),
      livImgLivro: this.formBuilder.control('')
    });
  }

  preview(files) {    
    if (files.length === 0){      
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";      
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;      
    }    
  }
  private loadLivro(){    
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(        
        switchMap(params => this.livroService.getById(+params.get("id")))
      )
      .subscribe(
        (livro) => {          
          this.livro = livro;
          this.respIsbnAuthors = livro.lstAutor;
          this.imgURL = livro.livImgLivro;
          this.smallThumbnail = livro.livImgSmallLivro;          
          if(!this.smallThumbnail){
            this.smallThumbnail = livro.livImgLivro;  
          }
          this.livroForm.patchValue(livro);
        },
        (error) => alert(error.error)
      )
    }
  }

  private actionsForSuccess(){
    toastr.info("Operação realizada com sucesso!")

    this.router.navigateByUrl("livro", {skipLocationChange: true}).then(
        () => this.router.navigate(["livro"])
    )
    // const id =  this.route.snapshot.url[0].path
    // if(id != undefined){
    //     this.router.navigateByUrl("livro", {skipLocationChange: true}).then(
    //     () => this.router.navigate([`livro/${id}/edit`])
    //   )
    // }    
  }

  private actionsForError(error){
    toastr.error(error)
  }

  delete(id: number){

    if (confirm("Deseje excluir esta Livro?")){
      this.livroService.delete(id)
      .subscribe(
        //autor => this.pesquisar(),
        autor => this.actionsForSuccess(),
        error => alert('Houve um erro!')
      )
    }    
  }
}