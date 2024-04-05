export interface JwtPayload {
  id: number;
  role: 'user' | 'admin' | 'empresa';
}
