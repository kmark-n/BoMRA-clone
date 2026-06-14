export interface LoginRequest {
  email:    string;
  password: string;
}

export interface RegisterRequest {
  email:            string;
  password:         string;
  password_confirmation: string;
}

export interface AuthResponse {
  message: string;
  token:   string;
  user:    {
    id:    number;
    email: string;
  };
}