import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import { useField } from 'formik';
import React from 'react';

import { ReducedList } from 'lib/types';
import useFetch from 'lib/useFetch';

import { BaseProps } from './common';

const ListSelect = ({ label, ...props }: BaseProps<number | null>): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, name }, _, { setValue }] = useField(props);

  const { data } = useFetch<ReducedList[]>('/lists');

  return (
    <FormGroup label={label} labelFor={name}>
      <HTMLSelect
        id={name}
        style={{ maxHeight: '2rem' }}
        fill
        value={value || 'null'}
        onChange={(e) => setValue(e.target.value === 'null' ? null : parseInt(e.target.value))}
      >
        <option value="null">N/A</option>
        {data?.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </HTMLSelect>
    </FormGroup>
  );
};

export default ListSelect;
