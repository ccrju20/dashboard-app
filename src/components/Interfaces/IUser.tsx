export interface IUser {
  id: number;
  email: string;
  uuid: string;
  createdAt: Date;
  contactInfo: IContactInfo;
}

export interface IContactInfo {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  addresstwo: string;
  city: string;
  state: string;
  postal: string;
}
