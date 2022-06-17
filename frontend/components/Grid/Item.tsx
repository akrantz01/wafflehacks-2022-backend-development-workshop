import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  label: string;
  children: ReactNode;
}

const Item = ({ label, children }: Props): JSX.Element => (
  <div className={styles.item}>
    <p className={styles.itemLabel}>{label}</p>
    {children}
  </div>
);

export default Item;
