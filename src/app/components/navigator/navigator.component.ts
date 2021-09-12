import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void { }

  addImages(event: any) {
    if (event.target.files.length > 0) {
      let elements = event.target.files;
      /*Itera por cada elemento añadido*/
      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        this.imagesService.setImage(element);
      }
    }
  }

  imprimir() {
    this.myEvent.emit();
  }

  reloadIframe() { }

  refreshIframe() { }

}
