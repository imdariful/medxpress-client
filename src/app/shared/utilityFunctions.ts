import { Product } from './models/product.model';

/**
 * Sets the image for a given product based on its dosage form.
 * @param product - The product to set the image for.
 * @returns The path to the image file.
 */
export function setImage(product: Product): string {
  product.dosage_form.toLocaleLowerCase();
  if (product.dosage_form.toLowerCase().includes('syrup')) {
    return 'assets/icons/syrup.svg';
  }

  if (product.dosage_form.toLowerCase().includes('suspension')) {
    return 'assets/icons/suspension.svg';
  }
  if (product.dosage_form.toLowerCase().includes('powder')) {
    return 'assets/icons/powder.svg';
  }

  if (product.dosage_form.toLowerCase().includes('injection')) {
    return 'assets/icons/injection.svg';
  }
  if (
    product.dosage_form
      .toLowerCase()
      .includes('cream' || 'ointment' || 'solution' || 'lotion')
  ) {
    return 'assets/icons/ointment.svg';
  }

  if (product.dosage_form.toLowerCase().includes('gel')) {
    return 'assets/icons/gel-tube.svg';
  }
  if (product.dosage_form.toLowerCase().includes('chewable')) {
    return 'assets/icons/chewable.svg';
  }
  if (product.dosage_form.toLowerCase().includes('capsule' || 'tablet')) {
    return 'assets/icons/capsule.svg';
  }

  return 'assets/icons/capsule.svg';
}
