import { Component, OnInit, Input } from '@angular/core';
import { Editora } from '../editora.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditoraService } from '../editora.service';
import toastr from 'toastr';

@Component({
  selector: 'app-pesquisar-editora',
  templateUrl: './pesquisar-editora.component.html'
})

export class PesquisarEditoraComponent implements OnInit {

  @Input() editora: Editora = new Editora();
  editoraFormPesquisa: FormGroup;

  editoras: Editora[] = []

  constructor(
    private editoraService: EditoraService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildEditoraForm();
    this.pesquisar();  
  }

  pesquisar(){
    this.editoraService.getAll().subscribe(
      editoras => this.editoras = editoras,
      error => alert('Houve um erro!')      
    )
  }

  filtrar(){

    const editora: Editora = Object.assign(new Editora(), this.editoraFormPesquisa.value);

    this.editoraService.filtrar(editora).subscribe(
      editoras => this.editoras = editoras,
      error => alert('Houve um erro!')     
    );
  }

  delete(id: number){

    if (confirm("Deseje excluir esta Editora?")){
      this.editoraService.delete(id)
      .subscribe(
        //autor => this.pesquisar(),
        autor => this.actionsForSuccess(),
        error => alert('Houve um erro!')
      )
    }    
  }

  private actionsForSuccess(){
    toastr.info("Operação realizada com sucesso!")
    // this.router.navigateByUrl("autor", {skipLocationChange: true}).then(
    //   () => this.router.navigate(["autor"])
    // )
    this.pesquisar()
  }

  limpar(){
    //this.editoras = []
    this.buildEditoraForm();
  }

  private buildEditoraForm(){
    this.editoraFormPesquisa = this.formBuilder.group({
      edtNomeEditora: this.formBuilder.control('')
    });
  }
}