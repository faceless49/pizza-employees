import React, { FC } from 'react';

import styles from './Subtitle.module.scss';

import { ReturnComponentType } from 'types';

type SubtitlePropsType = {
  value: string;
};
export const Subtitle: FC<SubtitlePropsType> = ({ value }): ReturnComponentType => (
  <h3 className={styles.subtitle}>{value}</h3>
);
