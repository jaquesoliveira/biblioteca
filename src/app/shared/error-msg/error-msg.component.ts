import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {

  public error: string

  setError(error: string){
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, 5000);

    return false;
  }
}