import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

/**
 * A pipe that transforms a number into a formatted currency string with the given currency code, symbol, display, and digits.
 * @param value The number to be formatted.
 * @param currencyCode The currency code to be used in formatting. Default is 'BDT'.
 * @param symbol The currency symbol to be used in formatting. Default is '৳'.
 * @param display The display format for the currency. Default is 'symbol'.
 * @param digits The number of digits to be displayed after the decimal point. Default is '1.2-2'.
 * @returns The formatted currency string.
 */
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
