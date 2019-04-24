import { Component, OnInit, Input, Injectable } from '@angular/core';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html'
})

@Injectable({
  providedIn: 'root',
})
export class AutorComponent implements OnInit {

  constructor(private autorService: AutorService) { }

  ngOnInit() {
    
  }
}