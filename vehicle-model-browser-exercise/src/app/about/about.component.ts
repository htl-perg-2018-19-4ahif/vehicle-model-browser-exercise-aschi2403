import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from "lorem-ipsum";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 8
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  content: string = '';

  constructor() { }

  ngOnInit() {
    this.content = this.lorem.generateParagraphs(5);
  }

  

}
