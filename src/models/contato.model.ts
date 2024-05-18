export class Contato {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  category?: ContactCategory;
}

export enum ContactCategory {
  FRIEND = "Friend",
  FAMILY = "Family"
}
