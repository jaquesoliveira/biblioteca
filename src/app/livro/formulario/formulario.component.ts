import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Livro } from '../Livro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  currentAction: string;
  titulo: string;
  livroForm: FormGroup;  
  @Input() livro: Livro = new Livro();

  constructor(     
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildLivroForm();    
    this.loadLivro();       
  }

  ngAfterContentChecked(){

  }

  enviar(){
    const dadosFormulario = this.livroForm.value 

    const edtForm = new Livro(
      dadosFormulario.livSeqLivro,
      dadosFormulario.livCodBarrasLivro,
      dadosFormulario.livTitulo,
      dadosFormulario.livDscLivro,
      dadosFormulario.livAnoEdicaoLivro,
      dadosFormulario.edtSeqEditora,
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
      edtSeqEditora:  this.formBuilder.control(''),
      ctlSeqCategoriaLivro:  this.formBuilder.control(''),
      livFlgLido:  this.formBuilder.control(''),
      livFlgLiteraturaEstrangeira:  this.formBuilder.control(''),
      livPaginasLivro:  this.formBuilder.control(''),
      lstAutor:  this.formBuilder.control('')
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
          this.livroForm.patchValue(livro)
        },
        (error) => alert('Ocorreu um erro')
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
    console.log(error)
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
