export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  country: string;
  postalCode?: string;
};

export type Suggestion = {
  title: string;
  subTitle: string;
};
