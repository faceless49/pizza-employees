import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import styles from './User.module.scss';

import { UserType } from 'redux/types';
import { ReturnComponentType } from 'types';

export const User: FC<UserType> = React.memo(
  ({ id, name, phone, role }): ReturnComponentType => (
    <div className={styles.user_wrapper}>
      <ul className={styles.user_list}>
        <li className={styles.user_item}>
          ФИО: <span className={styles.user_info}>{name}</span>
        </li>
        <li className={styles.user_item}>
          Phone <span className={styles.user_info}>{phone}</span>
        </li>
        <li className={styles.user_item}>
          role: <span className={styles.user_info}>{role}</span>
        </li>
      </ul>
      <Link className={styles.user_link} to={`/user/${id}`}>
        Подробнее
      </Link>
    </div>
  ),
);
