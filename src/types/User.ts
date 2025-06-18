export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Profile extends Omit<User, "uid"> {
  bio?: string;
}
