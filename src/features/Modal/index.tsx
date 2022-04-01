import { FC, ReactChild } from 'react';

import styles from './Modal.module.scss';

import { ReturnComponentType } from 'types';

export const Modal: FC<ModalPropsType> = ({ active, children }): ReturnComponentType => (
  <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}>
    <div
      className={
        active ? `${styles.modalContent} ${styles.active}` : `${styles.modalContent}`
      }
    >
      {children}
    </div>
  </div>
);

// types

type ModalPropsType = {
  children: ReactChild;
  active: boolean;
  // setActive: Dispatch<SetStateAction<boolean>>;
};
