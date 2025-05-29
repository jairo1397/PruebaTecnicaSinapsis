import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  // Método para activar el loader
  show() {
    this._loading.next(true);
  }

  // Método para ocultar el loader
  hide() {
    this._loading.next(false);
  }
}