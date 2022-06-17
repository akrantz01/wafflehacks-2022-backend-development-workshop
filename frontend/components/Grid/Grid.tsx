import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
}

const Grid = ({ children }: Props): JSX.Element => <div className={styles.grid}>{children}</div>;

export default Grid;
