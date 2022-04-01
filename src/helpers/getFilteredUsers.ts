import { UserType } from 'redux/types';

export const getFilteredUsers = (
  users: UserType[],
  filterType: string,
  archiveFilter: boolean,
): UserType[] =>
  [...users].filter(({ role, isArchive }) => {
    if (archiveFilter && !isArchive) {
      return false;
    }

    if (filterType !== 'all' && filterType !== role) {
      return false;
    }

    return true;
  });
