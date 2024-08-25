import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true,
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string | null, ...args: number[]): string | null {
    const trimLength = args[0];
    if (value && value?.length <= trimLength) return value;
    else return value?.substring(0, args[0]) + '...';
  }
}
