import { Button, FormGroup, H2, InputGroup, Intent, Switch, TextArea } from '@blueprintjs/core';
import { FieldInputProps, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import BackButton from 'components/BackButton';
import Card from 'components/Card';
import { Grid } from 'components/Grid';
import { buildUrl } from 'lib/url';

import styles from './form.module.css';

interface BaseField<T> {
  key: keyof T;
}

interface CannedField<T> extends BaseField<T> {
  label: string;
  required?: boolean;
}

interface CustomField<T> extends BaseField<T> {
  type: 'custom';
  component: (props: FieldInputProps<never>) => ReactNode;
}

interface ShortField<T> extends CannedField<T> {
  type: 'short';
}

interface LongField<T> extends CannedField<T> {
  type: 'long';
}

interface SwitchField<T> extends CannedField<T> {
  type: 'switch';
}

type Field<T> = CustomField<T> | ShortField<T> | LongField<T> | SwitchField<T>;

interface Props<T> {
  path: string;
  method?: 'POST' | 'PATCH';
  objectType: string;
  initialValues: T;
  transformBody?: (values: T) => Record<string, unknown>;
  fields: Field<T>[];
  redirectTo: string;
}

const FormView = <T extends Record<string, unknown>>({
  path,
  method = 'POST',
  objectType,
  initialValues,
  transformBody = (v: T) => v,
  fields,
  redirectTo,
}: Props<T>): JSX.Element => {
  const router = useRouter();

  const onSubmit = async (values: T) => {
    await fetch(buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformBody(values)),
    });
    await router.push(redirectTo);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ getFieldProps, isSubmitting, submitForm }) => (
        <Card>
          <H2>New {objectType.charAt(0).toUpperCase() + objectType.slice(1)}</H2>

          <Form className={styles.form}>
            <Grid>
              {fields.map((f) => {
                if (f.type === 'custom') return f.component(getFieldProps(f.key));

                const required = f.required ? '(required)' : undefined;
                const id = f.key.toString();

                switch (f.type) {
                  case 'short':
                    return (
                      <FormGroup label={f.label} labelInfo={required} labelFor={id}>
                        <InputGroup id={id} fill {...getFieldProps(f.key)} />
                      </FormGroup>
                    );
                  case 'long':
                    return (
                      <FormGroup label={f.label} labelInfo={required} labelFor={id}>
                        <TextArea id={id} fill {...getFieldProps(f.key)} />
                      </FormGroup>
                    );
                  case 'switch':
                    const props = getFieldProps(f.key);
                    return (
                      <Switch
                        id={id}
                        label={f.label}
                        required={f.required}
                        checked={props.checked}
                        onChange={props.onChange}
                      />
                    );
                }
              })}
            </Grid>
          </Form>

          <div className={styles.footer}>
            <BackButton />
            <Button intent={Intent.SUCCESS} icon="floppy-disk" loading={isSubmitting} onClick={submitForm}>
              Save
            </Button>
          </div>
        </Card>
      )}
    </Formik>
  );
};

export default FormView;
