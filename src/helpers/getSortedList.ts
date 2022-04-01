import { compareAsc } from 'date-fns';

import { UserType } from 'redux/types';

const getFormatData = (str: string): string => str.split('.').reverse().join('-');

export const getSortedList = (users: UserType[], sortType: string): UserType[] => {
  switch (sortType) {
    case 'name':
      return [...users].sort((a, b) => a.name.localeCompare(b.name));
    case 'birthday':
      return [...users].sort((a, b) => {
        const dateA = getFormatData(a.birthday);
        const dateB = getFormatData(b.birthday);
        return compareAsc(new Date(dateA), new Date(dateB));
      });

    default:
      return users;
  }
};
