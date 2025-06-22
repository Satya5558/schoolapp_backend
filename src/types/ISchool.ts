export interface ISchool {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone_number: string;
  website: string;
  logo_original_name: string;
  createdAt: Date;
  updatedAt: Date;
  storage_logo_name: string;
  school_unique_id: string;

  // getUniqueSchoolId(): Promise<string>;
  // checkPassword(password: string, dbPassword: string): Promise<boolean>;
}
