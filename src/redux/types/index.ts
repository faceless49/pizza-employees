import { UsersActionTypes } from '../actions/users';

export type UserType = {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
};

export type ActionsType = UsersActionTypes;
