import { Button, InputGroup, Intent } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';

const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN || '';

const DomainInput = (): JSX.Element => {
  const [initialized, setInitialized] = useState(false);
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const previous = localStorage.getItem('domain');
    setDomain(previous || DEFAULT_DOMAIN);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) localStorage.setItem('domain', domain);
  }, [domain, initialized]);

  const resetButton = <Button icon="reset" intent={Intent.WARNING} minimal onClick={() => setDomain(DEFAULT_DOMAIN)} />;

  return (
    <InputGroup
      placeholder="Domain"
      style={{ width: '200%', marginLeft: '-100%' }}
      fill
      value={domain}
      onChange={(e) => setDomain(e.target.value)}
      rightElement={domain !== DEFAULT_DOMAIN ? resetButton : undefined}
    />
  );
};

export default DomainInput;
