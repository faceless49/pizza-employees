import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { User } from 'components/User';
import { fetchUsers } from 'redux/thunks/users';
import { UserType } from 'redux/types';
import { ReturnComponentType } from 'types';

type UserListPropsType = {
  users: UserType[];
};

const UserList: FC<UserListPropsType> = ({ users }): ReturnComponentType => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      {users.map(({ id, name, role, phone, ...restProps }) => (
        <User key={id} id={id} name={name} role={role} phone={phone} {...restProps} />
      ))}
    </>
  );
};
export default UserList;
