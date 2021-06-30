import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({selector: '[decimalPlaces]'})
export class DecimalPlacesDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  @Input()
  decimalPlaces = 2;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const regexStr = `^\\d*\\.?\\d{0,${this.decimalPlaces}}$`;
    const regex: RegExp = new RegExp(regexStr, 'g');
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }
}
