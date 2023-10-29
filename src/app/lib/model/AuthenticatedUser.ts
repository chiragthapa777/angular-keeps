export interface AuthenticatedUser {
  _id:       string;
  name:      string;
  email:     string;
  notes:     any[];
  createdAt: Date;
  __v:       number;
}
