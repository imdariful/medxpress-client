export interface Product {
  _id: string;
  brand_name: string;
  type: string;
  dosage_form: string;
  strength: string;
  manufacturer: string;
  generics: string[];
  package_size: string;
  unit_price: string;
}
