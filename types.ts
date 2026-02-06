
export interface User {
  username: string;
  password?: string; // Optional because we don't want to pass it around after login
  email: string;
  contact: string;
  gender: 'Male' | 'Female' | 'Other' | 'N/A';
}

export enum AuthStatus {
  LoggedOut,
  AwaitingMfa,
  LoggedIn,
}

export interface StoredFile {
  name: string;
  type: string;
  size: number;
  raw_name: string; // Represents the encrypted filename on the "server"
}
