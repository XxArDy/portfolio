import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TypewriterService {
  typeText(text: string, speed = 50): Observable<string> {
    return new Observable<string>((subscriber) => {
      let index = 0;
      const typing = interval(speed)
        .pipe(take(text.length))
        .subscribe(() => {
          subscriber.next(text.slice(0, index + 1));
          index++;
          if (index === text.length) {
            subscriber.complete();
          }
        });
    });
  }
}
