import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'takaCurrency',
})
export class TakaCurrencyPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    currencyCode: string = 'BDT',
    symbol: string = '৳',
    display: 'code' | 'symbol' | 'symbol-narrow' | string = 'symbol',
    digits: string = '1.2-2'
  ): string {
    if (value == null) {
      return '';
    }

    const currencyPipe = new CurrencyPipe('en-US');
    const formattedValue = currencyPipe.transform(
      value,
      currencyCode,
      display,
      digits
    );

    return formattedValue ? formattedValue.replace(currencyCode, symbol) : '';
  }
}
