export interface ProductApplication {
  id?:                number;
  user_id?:           number;
  brand_name:         string;
  atc_code:           string;
  manufacturing_site: string;
  status?:            'DRAFTS' | 'ON GOING' | 'QUERIED' | 'APPROVED' | 'REJECTED';
  created_at?:        string;
  updated_at?:        string;
}
