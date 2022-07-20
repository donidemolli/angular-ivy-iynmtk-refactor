import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(phone): string {
    if (!phone || phone.trim() === '') {
      return '';
    }
    let formatted: string;
    formatted = '(' + phone.substring(0, 3) + ') ';
    formatted = formatted + phone.substring(3, 6) + '-';
    formatted = formatted + phone.substring(6, 10);
    return formatted;
  }
}
