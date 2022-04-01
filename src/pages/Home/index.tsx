import React, { ChangeEvent, MouseEvent, Suspense, useMemo, useState } from 'react';

import styles from './Home.module.scss';

import { SideBar } from 'components/Sidebar';
import { Button } from 'features/Button';
import { Modal } from 'features/Modal';
import { ModalAddUser } from 'features/Modal/ModalChildrens/ModalAddUser';
import { Preloader } from 'features/Preloader';
import { Subtitle } from 'features/Subtitle';
import { getFilteredUsers, getSortedList } from 'helpers';
import { useAppSelector } from 'hooks/useAppSelector';
import { UserType } from 'redux/types';
import { Nullable, ReturnComponentType } from 'types';

const UserList = React.lazy(() => import('components/UserList/'));
// Or we can do isInitialize boolean in the initialState
// and dispatch after Promise resolving
// or we can use without lazy with React v.18
export const Home = (): ReturnComponentType => {
  const users = useAppSelector<UserType[]>(state => state.users);

  const [sortType, setSortType] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isArchive, setIsArchive] = useState<boolean>(false);

  const [modalActive, setModalActive] = useState(false);

  const filteredUsersList = useMemo(
    (): UserType[] => getFilteredUsers(users, filterType, isArchive),
    [users, filterType, isArchive],
  );
  const sortedUsersList = useMemo(
    (): UserType[] => getSortedList(filteredUsersList, sortType),
    [filteredUsersList, sortType],
  );

  const handleSortUsersClick = (e: MouseEvent<HTMLButtonElement>): Nullable<void> => {
    setSortType(e.currentTarget.value);
  };

  const handleFilterUsersClick = (e: ChangeEvent<HTMLSelectElement>): Nullable<void> => {
    setFilterType(e.currentTarget.value);
  };
  const handleFilterInArchiveUsersCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
  ): Nullable<void> => {
    setIsArchive(e.currentTarget.checked);
  };

  const addUserHandler = (): Nullable<void> => {
    setModalActive(true);
  };

  return (
    <section className={styles.home}>
      <SideBar
        onSortUsersClick={handleSortUsersClick}
        onChangeFilterUsers={handleFilterUsersClick}
        onChangeFilterInArchive={handleFilterInArchiveUsersCheckbox}
        filterType={filterType}
        isArchive={isArchive}
      />
      <div className={styles.home_wrapper}>
        <div className={styles.home_header}>
          <Subtitle value="Список пользователей" />
          <Button onClick={addUserHandler} type="button">
            Добавить пользователя
          </Button>
        </div>
        <Suspense fallback={<Preloader />}>
          <UserList users={sortedUsersList} />
        </Suspense>
      </div>
      <Modal active={modalActive}>
        <ModalAddUser setModalActive={setModalActive} />
      </Modal>
    </section>
  );
};
