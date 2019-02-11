import { Component, OnInit, Input } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import toastr from 'toastr';

@Component({
  selector: 'app-pesquisar-autor',
  templateUrl: './pesquisar-autor.component.html'
})
export class PesquisarAutorComponent implements OnInit {
  
  @Input() autor: Autor = new Autor();
  autorFormPesquisa: FormGroup;   

  autores: Autor[] = []

  constructor(
      private autorService: AutorService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.buildAutorForm();
    this.pesquisar();
  }

  pesquisar(){
    this.autorService.getAll().subscribe(
      autores => this.autores = autores,
      error => alert('Houve um erro!')      
    )
  }

  filtrar(){

    const autor: Autor = Object.assign(new Autor(), this.autorFormPesquisa.value);

    this.autorService.filtrar(autor).subscribe(
      autores => this.autores = autores,
      error => alert('Houve um erro!')     
    );
  }

  delete(id: number){

    if (confirm("Deseje excluir este autor?")){
      this.autorService.delete(id)
      .subscribe(
        // autor => this.pesquisar(),
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
    //this.autores = []
    this.buildAutorForm();
  }

  private buildAutorForm(){
    this.autorFormPesquisa = this.formBuilder.group({
      autNomeAutor: this.formBuilder.control('')
    });
  }
}
