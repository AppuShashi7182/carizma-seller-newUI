import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-each-question',
  templateUrl: './each-question.component.html',
  styleUrls: ['./each-question.component.css'],
})
export class EachQuestionComponent {
  @Input() Question: any;
  ngOnInIt() {}
}
