import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private images: File[] = [];
  private subject = new BehaviorSubject<File[]>(this.images)

  constructor() { }

  get imagesList(): Observable<File[]> {
    return this.subject;
  }

  setImage(data: File) {
    /*Comprueba que no exista*/
    let duplicated = this.images.some((item: any) => { return item.name == data.name })
    if (!duplicated) {
      /*Agrega a la lista*/
      this.images.push(data);
      /*Actualiza subject*/
      this.subject.next(this.images);
    }
  }
}
