import React from 'react';

import styles from './App.module.scss';

import { AppRoutes } from 'Routes/AppRoutes';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => (
  <div className={styles.App}>
    <AppRoutes />
  </div>
);

export default App;
