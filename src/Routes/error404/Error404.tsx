import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Nullable, ReturnComponentType } from '../../types';

import styles from './Error404.module.scss';

export const Error404: React.FC = (): ReturnComponentType => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onPrevPageButtonClick = (): Nullable<void> => {
    navigate('/');
  };
  return (
    <div className={styles.messageWrapper}>
      <div>Oops, this page</div>
      <div className={styles.pageName}>{pathname}</div>
      <div> was not found!</div>
      <div>Either something went wrong or the page doesnt exist anymore.</div>
      <button
        className={styles.goHomeButton}
        type="button"
        onClick={onPrevPageButtonClick}
      >
        Go Home
      </button>
    </div>
  );
};
