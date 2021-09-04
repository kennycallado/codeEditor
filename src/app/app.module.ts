import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SafepipePipe } from './pipes/safepipe.pipe';

import { EditorComponent } from './components/editor/editor.component';
import { PreviewComponent } from './components/preview/preview.component';
import { NavigatorComponent } from './components/navigator/navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    SafepipePipe,
    EditorComponent,
    PreviewComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
