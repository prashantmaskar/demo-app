import {  Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthname'
  })

 export class MonthName implements PipeTransform {
    
    transform(value: any, args?: any): any {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nove', 'Dec' ];
      return months[value - 1] || '';
    
  }
}