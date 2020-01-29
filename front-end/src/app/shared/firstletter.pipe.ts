import { Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstWord'
})

export class FirstWordPipe implements PipeTransform{
transform(value: string, args: any[]): string {
  if(!value){
    return '';
  }
  return value.split('')[0];
}
}
