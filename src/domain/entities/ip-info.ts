export interface IPInfo {
  ip: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  [key: string]: any; // Additional fields from ipwhois.io
}