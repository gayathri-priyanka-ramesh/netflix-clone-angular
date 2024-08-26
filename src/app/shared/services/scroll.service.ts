import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}

  private scrollToSectionSubject = new Subject<string>();
  scrollToSection$ = this.scrollToSectionSubject.asObservable();

  scrollToSection(section: string) {
    console.log('Current Section:', section);
    this.scrollToSectionSubject.next(section);
    console.log('scrollToSectionSubject:', this.scrollToSectionSubject);
    console.log('scrollToSection$:', this.scrollToSection$);
  }
}
