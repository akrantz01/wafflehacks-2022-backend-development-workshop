import { Card as BaseCard, Elevation } from '@blueprintjs/core';
import React, { ReactNode } from 'react';

import styles from './card.module.css';

interface Props {
  children?: ReactNode;
}

const Card = ({ children }: Props): JSX.Element => (
  <BaseCard className={styles.card} elevation={Elevation.ONE}>
    {children}
  </BaseCard>
);

export default Card;
