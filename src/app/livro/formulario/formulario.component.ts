import { Component, OnInit, Input, ViewChild, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Livro } from '../Livro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { Editora } from 'src/app/editora/editora.model';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { Autor } from 'src/app/autor/autor.model';
import { AutorService } from 'src/app/autor/autor.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit,  AfterContentChecked {

  @ViewChild(NgAutoCompleteComponent) public completer: NgAutoCompleteComponent;
    
    public group = [
        CreateNewAutocompleteGroup(
            'Search / choose in / from list',
            'completer',
            [
                {title: 'Option 1', id: '1'},
                {title: 'Option 2', id: '2'},
                {title: 'Option 3', id: '3'},
                {title: 'Option 4', id: '4'},
                {title: 'Option 5', id: '5'},
            ],
            {titleKey: 'title', childrenKey: null}
        ),
    ];

    

  currentAction: string;
  titulo: string;
  livroForm: FormGroup;  
  edtSeqEditora: FormGroup; 
  lstAutor: FormGroup;
  autores: Autor[] = []
  todosOsAutores: Autor[] = [];
  respIsbn: any = ""

  
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
      console.log(item);
  }  

  ngOnInit() {
    this.setCurrentAction();
    this.buildLivroForm();    
    this.loadLivro();    
  
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

    //console.log(`>>>>>>>>>>>${livro.livCodBarrasLivro}`)

    if(`${livro.livCodBarrasLivro}`!= ""){      

      this.livroService.pesquisarPorIsbn(`${livro.livCodBarrasLivro}`)
      .subscribe(
        data => {
          if(data != undefined){
            this.respIsbn = data.items[0];
            if(this.respIsbn != undefined){
              this.livroService.pesquisarPorIsbnDetalhe(this.respIsbn.selfLink).subscribe(
                data => {
                  if(data != undefined){
                    this.respIsbn = data.volumeInfo;
                    livro.livTitulo = this.respIsbn.title
                    livro.livDscLivro = this.respIsbn.description
                    livro.livPaginasLivro = this.respIsbn.pageCount
                    livro.livEditora = this.respIsbn.publisher
                    livro.lstAutor = this.respIsbn.authors
                    this.buildLivroForm();
                    this.livroForm.patchValue(livro)
                    console.log(this.respIsbn)
                  }
              });
            }
          }
      });
    }
    
  }

  enviar(){
    const dadosFormulario = this.livroForm.value 

    const edtForm = new Livro(
      dadosFormulario.livSeqLivro,
      dadosFormulario.livCodBarrasLivro,
      dadosFormulario.livTitulo,
      dadosFormulario.livDscLivro,
      dadosFormulario.livAnoEdicaoLivro,
      dadosFormulario.livEditora,
      dadosFormulario.ctlSeqCategoriaLivro,
      dadosFormulario.livFlgLido,
      dadosFormulario.livFlgLiteraturaEstrangeira,
      dadosFormulario.livPaginasLivro,
      dadosFormulario.lstAutor
    ); 
     

    if( this.route.snapshot.url[0].path == "new"){
      
      const livro: Livro = Object.assign(new Livro(), this.livroForm.value);

      this.livroService.create(livro)
        .subscribe(
          livro => this.actionsForSuccess(),
          //error => alert('Houve um erro!')     
          error => this.actionsForError(error)     
        );
    }else{
      const id =  this.route.snapshot.url[0].path
      
      //console.log(edtForm)

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
      }else{
        this.currentAction = "edit"
        this.titulo = "Alterar Livro"
      }
    }  

    //console.log(this.currentAction)
  }

  private buildLivroForm(){
    this.livroForm = this.formBuilder.group({
      livSeqLivro: this.formBuilder.control(''),
      livCodBarrasLivro: this.formBuilder.control(''),
      livTitulo:  this.formBuilder.control(''),
      livDscLivro:  this.formBuilder.control(''),
      livAnoEdicaoLivro:  this.formBuilder.control(''),
      livEditora:  this.formBuilder.control(''),
      
      // edtSeqEditora: this.formBuilder.group({
      //   edtSeqEditora: this.formBuilder.control(''),
      //   edtNomeEditora: this.formBuilder.control(''),
      //   edtDscEditora: this.formBuilder.control('')
      // }),

      // lstAutor: this.formBuilder.group({
      //   edtSeqEditora: this.formBuilder.control(''),
      //   edtNomeEditora: this.formBuilder.control(''),
      //   edtDscEditora: this.formBuilder.control('')
      // }),

      ctlSeqCategoriaLivro:  this.formBuilder.control(''),
      livFlgLido:  this.formBuilder.control(''),
      livFlgLiteraturaEstrangeira:  this.formBuilder.control(''),
      livPaginasLivro:  this.formBuilder.control(''),
      lstAutor: this.formBuilder.control('')
    });
  }

  private loadLivro(){    
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(        
        switchMap(params => this.livroService.getById(+params.get("id")))
      )
      .subscribe(
        (livro) => {
          
          this.livro = livro;
          livro.livTitulo = this.respIsbn.items[0].volumeInfo.title
          this.livroForm.patchValue(livro)
        },
        (error) => alert(error.error)
      )
    }
  }

  // toastr.info("Operação realizada com sucesso!")
  //   this.router.navigateByUrl("autor", { skipLocationChange: true }).then(
  //     () => this.router.navigate(["autor"])
  //   )

  private actionsForSuccess(){
    toastr.info("Operação realizada com sucesso!")
    this.router.navigateByUrl("livro", {skipLocationChange: true}).then(
       () => this.router.navigate(["livro"])
    )
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
