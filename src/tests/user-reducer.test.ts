import { actions } from 'redux/actions/users';
import { usersReducer } from 'redux/reducers/users';
import { UserType } from 'redux/types';

let initialState: UserType[] = [];

// * Magic numbers for tests
const ENDSTATE_ARR_LENGTH_AFTER_ADD_USER = 4;
const ENDSTATE_NEW_USER_INDEX = 3;
const ENDSTATE_NEW_USER_ID = 7;
const ENDSTATE_ARR_LENGTH_AFTER_UPDATE_USER = 3;

beforeEach(() => {
  initialState = [
    {
      id: 1,
      name: 'Илья Емельянов',
      isArchive: false,
      role: 'driver',
      phone: '+7 (883) 508-3269',
      birthday: '12.02.1982',
    },
    {
      id: 2,
      name: 'Александр Ларионов',
      isArchive: true,
      role: 'waiter',
      phone: '+7 (823) 440-3602',
      birthday: '26.01.1986',
    },
    {
      id: 3,
      name: 'Богдан Давыдов',
      isArchive: false,
      role: 'driver',
      phone: '+7 (971) 575-2645',
      birthday: '29.11.1990',
    },
  ];
});

test('new user should be added with new length of array', () => {
  const action = actions.addUser({
    id: 7,
    birthday: '21.09.2022',
    name: 'Maxim',
    role: 'driver',
    phone: '7-(999)-9999',
    isArchive: false,
  });

  const endState = usersReducer(initialState, action);

  expect(endState.length).toBe(ENDSTATE_ARR_LENGTH_AFTER_ADD_USER);
  expect(endState[ENDSTATE_NEW_USER_INDEX].id).toBe(ENDSTATE_NEW_USER_ID);
  expect(endState[ENDSTATE_NEW_USER_INDEX].name).toBe('Maxim');
});

test('after update user info should be change', () => {
  const action = actions.updateUser({
    id: 1,
    birthday: '21.09.2022',
    name: 'Maxim',
    role: 'driver',
    phone: '7-(999)-9999',
    isArchive: false,
  });

  const endState = usersReducer(initialState, action);

  expect(endState.length).toBe(ENDSTATE_ARR_LENGTH_AFTER_UPDATE_USER);
});
