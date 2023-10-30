import { Product } from './models/product.model';

export function setImage(product: Product): string {
  if (product.dosage_form.includes('Syrup')) {
    return 'assets/icons/syrup.svg';
  }

  if (product.dosage_form.includes('Suspension')) {
    return 'assets/icons/suspension.svg';
  }
  if (product.dosage_form.includes('Powder')) {
    return 'assets/icons/powder.svg';
  }
  if (product.dosage_form.includes('Capsule' || 'Tablet')) {
    return 'assets/icons/capsule.svg';
  }
  if (product.dosage_form.includes('Injection')) {
    return 'assets/icons/injection.svg';
  }
  if (product.dosage_form.includes('Cream' || 'Ointment')) {
    return 'assets/icons/ointment.svg';
  }

  if (product.dosage_form.includes('Gel')) {
    return 'assets/icons/gel-tube.svg';
  }
  if (product.dosage_form.includes('Chewable')) {
    return 'assets/icons/chewable.svg';
  }

  return 'assets/icons/capsule.svg';
}
