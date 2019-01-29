import { Component, OnInit, Input } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    this.autorService.delete(id)
      .subscribe(
        autor => this.pesquisar(),
        error => alert('Houve um erro!')
      )
  }


  private actionsForSuccess(autor: Autor){
    this.router.navigateByUrl("autor", {skipLocationChange: true}).then(
      () => this.router.navigate(["autor"])
    )
  }

  limpar(){
    this.autores = []
    this.buildAutorForm();
  }

  private buildAutorForm(){
    this.autorFormPesquisa = this.formBuilder.group({
      autNomeAutor: this.formBuilder.control('')
    });
  }
}
