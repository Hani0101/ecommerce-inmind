import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, wordLimit: number): string {
    if (!value) return ''; 
    const words = value.split(' '); 
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; 
    }
    return value; 
  }
}