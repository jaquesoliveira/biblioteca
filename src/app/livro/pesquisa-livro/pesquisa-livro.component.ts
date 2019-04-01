import { Component, OnInit, Input } from '@angular/core';
import { Livro } from '../Livro.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LivroService } from '../livro.service';
import toastr from 'toastr';

@Component({
  selector: 'app-pesquisa-livro',
  templateUrl: './pesquisa-livro.component.html',
  styleUrls: ['./pesquisa-livro.component.css']
})
export class PesquisaLivroComponent implements OnInit {

  @Input() editora: Livro = new Livro();
  livroFormPesquisa: FormGroup;

  livros: Livro[] = []

  constructor(
    private editoraService: LivroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildLivroForm();
    this.pesquisar();  
  }

  onEnter(){
    this.filtrar()
  }

  pesquisar(){
    this.editoraService.getAll().subscribe(
      livros => this.livros = livros,
      error => this.actionsForError(error)      
    )
  }

  filtrar(){

    const editora: Livro = Object.assign(new Livro(), this.livroFormPesquisa.value);

    this.editoraService.filtrar(editora).subscribe(
      livros => this.livros = livros,
      error => this.actionsForError(error)  
    );
  }

  delete(id: number){

    if (confirm("Deseje excluir esta Livro?")){
      this.editoraService.delete(id)
      .subscribe(
        //autor => this.pesquisar(),
        autor => this.actionsForSuccess(),
        error => this.actionsForError(error)
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

  private actionsForError(error){
    toastr.error(error)
  }

  limpar(){
    //this.livros = []
    this.buildLivroForm();
  }

  private buildLivroForm(){
    this.livroFormPesquisa = this.formBuilder.group({
      livTitulo: this.formBuilder.control('')
    });
  }

}
