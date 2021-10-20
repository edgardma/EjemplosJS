import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subject = new Subject();
  number1 = 0;
  number2 = 0;
  total1 = 0;
  total2 = 0;
  subscription1: any;
  subscription2: any;

  public constructor() {
    this.subscribe1();
    this.subscribe2();
  }

  subscribe1(): void {
    this.subscription1 = this.subject.subscribe(data => {
      this.total1 = this.number1 + this.number2;
    });
  }

  subscribe2(): void {
    this.subscription1 = this.subject.subscribe(data => {
      this.total2 = this.number1 * this.number2;
    });
  }

  change(): void {
    this.subject.next();
  }
}
