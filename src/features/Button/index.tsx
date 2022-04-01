import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './Button.module.scss';

import { ReturnComponentType } from 'types';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonPropsType = DefaultButtonPropsType & {
  onSetEditMode: () => void;
  onSubmit: () => void;
};

export const Button: React.FC<Partial<ButtonPropsType>> = ({
  children,
  disabled,
  ...restProps
}): ReturnComponentType => (
  <button className={styles.btn} type="button" disabled={disabled} {...restProps}>
    {children}
  </button>
);
