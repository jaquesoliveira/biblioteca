import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Editora } from '../editora.model';
import { EditoraService } from '../editora.service';
import { ActivatedRoute, Router } from '@angular/router';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  currentAction: string;
  titulo: string;
  editoraForm: FormGroup;  
  @Input() editora: Editora = new Editora();

  constructor(     
    private editoraService: EditoraService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEditoraForm();    
    this.loadEditora();       
  }

  ngAfterContentChecked(){

  }

  enviar(){
    const dadosFormulario = this.editoraForm.value 

    const edtForm = new Editora(
      dadosFormulario.edtSeqEditora,
      dadosFormulario.edtNomeEditora,
      dadosFormulario.edtDescricaoEditora
    );  

    if( this.route.snapshot.url[1].path == "new"){
      
      const editora: Editora = Object.assign(new Editora(), this.editoraForm.value);

      // this.editoraService.create(editora)
      //   .subscribe(
      //     autor => this.actionsForSuccess(autor),
      //     //error => alert('Houve um erro!')     
      //     error => this.actionsForError()     
      //   );
    }else{
      const id =  this.route.snapshot.url[1].path
      
      // this.editoraService.update(edtForm).subscribe(
      //   autor => this.actionsForSuccess(autor),
      //   error => alert('Houve um erro!')     
      // );
    }    
  }

  //
  private setCurrentAction(){
    if( this.route.snapshot.url[1] != undefined){
      if( this.route.snapshot.url[1].path == "new"){
        this.currentAction = "new"
        this.titulo = "Cadastrar Editora"
      }else{
        this.currentAction = "edit"
        this.titulo = "Editar Editora"
      }
    }  
  }

  private buildEditoraForm(){
    this.editoraForm = this.formBuilder.group({
      edtSeqEditora: this.formBuilder.control(''),
      edtNomeEditora: this.formBuilder.control(''),
      edtDescricaoEditora:  this.formBuilder.control('')
    });
  }

  private loadEditora(){    
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        //switchMap(params => this.editoraService.getById(+params.get("id")))
      )
      .subscribe(
        (editora) => {
          //this.editora = editora;
          //this.editoraForm.patchValue(editora)
        },
        (error) => alert('Ocorreu um erro')
      )
    }
  }

  private actionsForSuccess(autor: Editora){
    toastr.info("Operação realizada com sucesso!")
    // this.router.navigateByUrl("autor", {skipLocationChange: true}).then(
    //   () => this.router.navigate(["autor", autor.autSeqAutor, "edit"])
    // )
  }

  private actionsForError(){
    toastr.info("Houve um erro. Não foi possível realizar a operação!")
  }
}
