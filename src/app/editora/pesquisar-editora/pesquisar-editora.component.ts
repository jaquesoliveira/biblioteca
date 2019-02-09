import { Component, OnInit, Input } from '@angular/core';
import { Editora } from '../editora.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditoraService } from '../editora.service';
import toastr from 'toastr';

@Component({
  selector: 'app-pesquisar-editora',
  templateUrl: './pesquisar-editora.component.html',
  styleUrls: ['./pesquisar-editora.component.css']
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
    this.buildAutorForm();
    this.pesquisar();  
  }

  pesquisar(){
    // this.autorService.getAll().subscribe(
    //   autores => this.autores = autores,
    //   error => alert('Houve um erro!')      
    // )
  }

  filtrar(){    

    // const autor: Autor = Object.assign(new Autor(), this.autorFormPesquisa.value);

    // this.autorService.filtrar(autor).subscribe(
    //   autores => this.autores = autores,
    //   error => alert('Houve um erro!')     
    // );
  }

  delete(id: number){

    // if (confirm("Deseje excluir este autor?")){
    //   this.autorService.delete(id)
    //   .subscribe(
    //     // autor => this.pesquisar(),
    //     autor => this.actionsForSuccess(),
    //     error => alert('Houve um erro!')
    //   )
    // }    
  }

  private actionsForSuccess(){
    toastr.info("Operação realizada com sucesso!")
    // this.router.navigateByUrl("autor", {skipLocationChange: true}).then(
    //   () => this.router.navigate(["autor"])
    // )
    this.pesquisar()
  }

  limpar(){
    this.editoras = []
    this.buildAutorForm();
  }

  private buildAutorForm(){
    this.editoraFormPesquisa = this.formBuilder.group({
      edtNomeEditora: this.formBuilder.control('')
    });
  }
}