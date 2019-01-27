import { Component, OnInit, Input } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar-autor',
  templateUrl: './pesquisar-autor.component.html'
})
export class PesquisarAutorComponent implements OnInit {

  
  @Input() autor: Autor

  autores: Autor[] = []

  constructor(
      private autorService: AutorService,          
      private route: ActivatedRoute,
      private router: Router
    ) { }

  ngOnInit() {
    this.pesquisar();  
  }

  pesquisar(){
    this.autorService.getAll().subscribe(
      autores => this.autores = autores,
      error => alert('Houve um erro!')      
    )
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
  }
}
