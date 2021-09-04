import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import 'codemirror/mode/markdown/markdown'
import 'codemirror/keymap/vim'
import * as CodeMirror from 'codemirror'
import { MarkdownItService } from 'src/app/services/markdown-it.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('ref') ref!: ElementRef<HTMLTextAreaElement>;

  // Este value puede servir para iniciar.
  // Por ejemplo si se guarda contenido entre
  // sesiones.
  // Quizá también sea un servicio entre componentes

  value: any;
  codeMirror?: CodeMirror.EditorFromTextArea;
  options: any;
  theme: string = "solarized" + " dark";

  constructor(private markdownIt: MarkdownItService) {
    markdownIt.value.subscribe(m => this.value = m)
  }

  ngOnInit(): void {
  } // ngOnInit()

  ngAfterViewInit() {
    this.codeMirror = CodeMirror.fromTextArea(this.ref.nativeElement, {
      keyMap: "vim",
      mode: "markdown",
      autofocus: true,
      theme: this.theme,
      lineNumbers: true,
      indentUnit: 2,
      smartIndent: true,
      lineWrapping: true,
    });

    this.codeMirror.setSize("100%", "100%");
    this.codeMirror.on("change", (cm: any) => {
      this.markdownIt.setValue(cm.getValue());
    });
  } // ngAfterViewInit()

}
