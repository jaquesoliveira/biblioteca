import { Component, ViewChild, OnInit } from '@angular/core';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'biblioteca';
  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  ngOnInit() {   
    
  }  
}