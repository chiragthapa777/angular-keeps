export interface RegisterModelResponse {
  _id:       string;
  name:      string;
  email:     string;
  notes:     any[];
  createdAt: Date;
  __v:       number;
  token:     string;
}
