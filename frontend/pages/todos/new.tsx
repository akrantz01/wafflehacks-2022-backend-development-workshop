import { Button, Card, Elevation, FormGroup, H2, InputGroup, Intent, TextArea } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import BackButton from 'components/BackButton';
import { Grid } from 'components/Grid';
import { ListSelectInput } from 'components/inputs';
import type { Page } from 'lib/page';
import { Todo } from 'lib/types';

type Input = Pick<Todo, 'summary' | 'description' | 'list_id'>;

const initialValues: Input = {
  summary: '',
  description: '',
  list_id: null,
};

const New: Page = ({ domain }) => {
  const router = useRouter();

  const onSubmit = async (input: Input) => {
    await fetch(`https://${domain}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: input.summary,
        description: input.description.length === 0 ? null : input.description,
        list: input.list_id,
      }),
    });
    await router.push('/');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ getFieldProps, isSubmitting, submitForm }) => (
        <Card style={{ margin: 'auto', width: '50%' }} elevation={Elevation.ONE}>
          <H2>New Todo</H2>

          <Form style={{ marginTop: '1rem' }}>
            <Grid>
              <FormGroup label="Summary" labelInfo="(required)" labelFor="summary">
                <InputGroup id="summary" {...getFieldProps('summary')} />
              </FormGroup>

              <ListSelectInput domain={domain} label="List" {...getFieldProps('list_id')} />

              <FormGroup label="Description" labelFor="description">
                <TextArea id="description" fill {...getFieldProps('description')} />
              </FormGroup>
            </Grid>
          </Form>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BackButton />
            <Button intent={Intent.SUCCESS} icon="plus" loading={isSubmitting} onClick={submitForm}>
              Create
            </Button>
          </div>
        </Card>
      )}
    </Formik>
  );
};

export default New;
