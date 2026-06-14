export interface Stakeholder {
  id?:                  number;
  company_name:         string;
  registration_number:  string;
  contact_person:       string;
  email:                string;
  phone:                string;
  physical_address:     string;
  product_category:     string;
  stakeholder_type:     string;
  status?:              string;
  notes?:               string;
  created_at?:          string;
}