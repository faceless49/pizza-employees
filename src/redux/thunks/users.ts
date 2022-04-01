import { Dispatch } from 'redux';

import { actions, UserDomainType } from '../actions/users';
import data from '../mock/employees.json';
import { ActionsType, UserType } from '../types';

const fetchPing = 1500;

export const fetchUsers = () => (dispatch: Dispatch<ActionsType>) => {
  new Promise<UserType[]>(res => {
    setTimeout(() => {
      res(data);
    }, fetchPing);
  }).then(res => {
    dispatch(actions.setUsers(res));
  });
};

export const addUser =
  (userData: UserDomainType) => async (dispatch: Dispatch<ActionsType>) => {
    const newUser: UserType = {
      id: Math.random(), // BAD PRACTICE BUT IT'S JUST EXAMPLE
      name: userData.name,
      isArchive: false,
      role: userData.role,
      phone: userData.phone,
      birthday: '',
    };
    try {
      // const res = await api request
      // if (res) {dispatch}
      // Because we don't have api - Just plug
      dispatch(actions.addUser(newUser));
    } catch (e) {
      console.warn(e);
      console.warn('Something wrong');
    }
  };
