// CONSIDERATION: In real life production systems, the roles should also be stored in a separate table
// and managed by an admin user. The roles shouldn't be hardcoded in the code with an enum.
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
