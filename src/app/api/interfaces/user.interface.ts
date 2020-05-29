import { IBdData } from '../../shared/interfaces/bd-data.interface';

export interface IUser extends IBdData {
  id: number,
  firstname: string,
  secondname: string,
  birthday: string,
  email: string,
  telephone: string,
  height: number,
  weight: number,
};