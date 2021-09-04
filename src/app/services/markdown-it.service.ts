import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as MarkdownIt from 'markdown-it'
/*@ts-ignore*/
import * as markdownClass from '@toycode/markdown-it-class'


@Injectable({
  providedIn: 'root'
})
export class MarkdownItService {
  // quizá viene un value desde la carga de la aplicación ???
  mapping = { h2: 'break-before' }
  private md: MarkdownIt = new MarkdownIt({ html: true }).use(markdownClass, this.mapping);
  private subject: BehaviorSubject<string> = new BehaviorSubject("# Bienvenido");

  constructor() { }

  get value(): Observable<string> {
    return this.subject;
  }


  setValue(data: string) {
    this.subject.next(this.md.render(data));
  }
}
