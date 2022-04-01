import { UserType } from '../types';

import { InferActionsType } from 'types/actions';

export type UserDomainType = {
  name: string;
  role: string;
  phone: string;
};

export const actions = {
  setUsers: (users: UserType[]) => ({ type: 'PIZZA/USERS/SET-USERS', users } as const),
  addUser: (user: UserType) => ({ type: 'PIZZA/USERS/ADD-USER', user } as const),
  updateUser: (user: UserType) => ({ type: 'PIZZA/USERS/UPDATE-USER', user } as const),
};
export type UsersActionTypes = InferActionsType<typeof actions>;
