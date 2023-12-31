/**
 * Represents a product in the system.
 */
export interface Product {
  _id: string;
  name: string;
  type: string;
  dosage_form: string;
  strength: string;
  manufacturer: string;
  generics: string[];
  package_size: string;
  price: string;
  image: string;
}
