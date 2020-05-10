import { BdData } from '../../shared/interfaces/bd-data.interface';

export interface User extends BdData {
  id: number,
  firstname: string,
  secondname: string,
  birthday: string,
  email: string,
  telephone: string,
  height: number,
  weight: number,
};