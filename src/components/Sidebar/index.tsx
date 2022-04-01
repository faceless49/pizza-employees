import React, { ChangeEvent, FC, MouseEvent } from 'react';

import styles from './Sidebar.module.scss';

import { Button } from 'features/Button';
import { Subtitle } from 'features/Subtitle';
import { Nullable, ReturnComponentType } from 'types';

type SideBarPropsType = {
  onSortUsersClick: (e: MouseEvent<HTMLButtonElement>) => Nullable<void>;
  onChangeFilterUsers: (e: ChangeEvent<HTMLSelectElement>) => Nullable<void>;
  onChangeFilterInArchive: (e: ChangeEvent<HTMLInputElement>) => Nullable<void>;
  filterType: string;
  isArchive: boolean | undefined;
};
export const SideBar: FC<SideBarPropsType> = React.memo(
  ({
    onSortUsersClick,
    filterType,
    onChangeFilterUsers,
    isArchive,
    onChangeFilterInArchive,
  }): ReturnComponentType => (
    <div className={styles.sidebar}>
      <Subtitle value="Сортировка" />
      <Button onClick={onSortUsersClick} value="name" type="button">
        По имени
      </Button>
      <Button onClick={onSortUsersClick} value="birthday" type="button">
        По дате рождения
      </Button>
      <select value={filterType} onChange={onChangeFilterUsers}>
        <option value="all">Все работники</option>
        <option value="driver">Водитель</option>
        <option value="waiter">Официант</option>
        <option value="cook">Повар</option>
      </select>
      <label htmlFor="isArchive" className={styles.sidebar_label}>
        В архиве
        <input
          name="isArchive"
          type="checkbox"
          checked={isArchive}
          onChange={onChangeFilterInArchive}
        />
      </label>
    </div>
  ),
);
