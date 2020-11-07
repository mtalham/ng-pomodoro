import {Inject, Injectable} from '@angular/core';
import {EventManager} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';

type Options = {
  element: any;
  keys: string;
};

@Injectable({providedIn: 'root'})
export class Hotkeys {
  defaults: Partial<Options> = {
    element: this.document
  };

  constructor(private eventManager: EventManager,
              @Inject(DOCUMENT) private document: Document) {
  }

  addShortcut(options: Partial<Options>): Observable<unknown> {
    const merged = {...this.defaults, ...options};
    const event = `keydown.${merged.keys}`;

    return new Observable(observer => {
      const handler = (e) => {
        e.preventDefault();
        observer.next(e);
      };

      const dispose = this.eventManager.addEventListener(
        merged.element, event, handler
      );

      return () => {
        dispose();
      };
    });
  }
}
