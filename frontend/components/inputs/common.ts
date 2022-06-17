import { FieldHookConfig } from 'formik';
import { ReactNode } from 'react';

export type BaseProps<T> = FieldHookConfig<T> & {
  label: string | ReactNode;
};
