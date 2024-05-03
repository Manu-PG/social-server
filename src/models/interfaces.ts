export interface Post {
  userId: User;
  title: string;
  body: string;
}

export interface Comment {
  postId: Post;
  name: string;
  email: string;
  body: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}
