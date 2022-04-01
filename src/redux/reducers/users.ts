import { UsersActionTypes } from '../actions/users';
import { UserType } from '../types';

const initialState: UserType[] = [];

export const usersReducer = (
  state = initialState,
  action: UsersActionTypes,
): UserType[] => {
  switch (action.type) {
    case 'PIZZA/USERS/SET-USERS':
      return action.users.map(user => ({
        ...user,
      }));
    case 'PIZZA/USERS/ADD-USER':
      return [...state, action.user];
    case 'PIZZA/USERS/UPDATE-USER':
      return state.map(user => (user.id === action.user.id ? { ...action.user } : user));

    default:
      return state;
  }
};
