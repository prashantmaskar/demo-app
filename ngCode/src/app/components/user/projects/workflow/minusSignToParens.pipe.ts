import {  Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minusSignToParens'
  })

 export class MinusSignToParens implements PipeTransform {

    transform(value: any, args?: any): any {
       value = Math.abs(value);
      return isNaN(value) ? 0 : value;
  }
}