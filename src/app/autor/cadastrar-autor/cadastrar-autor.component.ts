import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-cadastrar-autor',
  templateUrl: './cadastrar-autor.component.html'
})
export class CadastrarAutorComponent implements OnInit {

  currentAction: string;
  titulo: string
  autorForm: FormGroup;  
  @Input() autor: Autor = new Autor();

  constructor(     
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildAutorForm();    
    this.loadAutor();       
  }

  ngAfterContentChecked(){

  }

  enviar(){
    const dadosFormulario = this.autorForm.value 

    const autForm = new Autor(
      dadosFormulario.autSeqAutor,
      dadosFormulario.autNomeAutor,
      dadosFormulario.autDescricaoAutor
    );

    if( this.route.snapshot.url[1].path == "new"){
      
      const autor: Autor = Object.assign(new Autor(), this.autorForm.value);

      this.autorService.create(autor)
        .subscribe(
          autor => this.actionsForSuccess(autor),
          //error => alert('Houve um erro!')     
          error => this.actionsForError()     
        );
    }else{
      const id =  this.route.snapshot.url[1].path
      
      this.autorService.update(autForm).subscribe(
        autor => this.actionsForSuccess(autor),
        error => alert('Houve um erro!')     
      );
    }
  }

  //
  private setCurrentAction(){
    if( this.route.snapshot.url[1].path == "new"){
      this.currentAction = "new"
      this.titulo = "Cadastrar Autor"
    }else{
      this.currentAction = "edit"
      this.titulo = "Editar Autor"
    }   
  }

  private buildAutorForm(){
    this.autorForm = this.formBuilder.group({
      autSeqAutor: this.formBuilder.control(''),
      autNomeAutor: this.formBuilder.control(''),
      autDescricaoAutor:  this.formBuilder.control('')
    });
  }

  private loadAutor(){    
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.autorService.getById(+params.get("id")))
      )
      .subscribe(
        (autor) => {
          this.autor = autor;
          this.autorForm.patchValue(autor)
        },
        (error) => alert('Ocorreu um erro')
      )
    }
  }

  private actionsForSuccess(autor: Autor){
    toastr.info("Operação realizada com sucesso!")
    this.router.navigateByUrl("autor", {skipLocationChange: true}).then(
      () => this.router.navigate(["autor", autor.autSeqAutor, "edit"])
    )
  }

  private actionsForError(){
    toastr.info("Houve um erro. Não foi possível realizar a operação!")
  }
}