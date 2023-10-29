import { Product } from './models/product.model';

export function setImage(product: Product): string {
  if (product) {
    switch (product.dosage_form) {
      case 'Syrup':
        return 'assets/icons/syrup.svg';
      case 'Ophthalmic Suspension' || 'Powder for Suspension':
        return 'assets/icons/suspension.svg';
      case 'Capsule' || 'Tablet':
        return 'assets/icons/capsule.svg';
      case 'IV Infusion' || 'IM/IV Injection':
        return 'assets/icons/injection.svg';
      case 'Cream':
        return 'assets/icons/ointment.svg';
      default:
        return 'assets/icons/capsule.svg';
    }
  }
  return 'assets/icons/capsule.svg';
}
