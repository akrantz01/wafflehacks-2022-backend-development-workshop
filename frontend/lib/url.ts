const localHosts = ['127.0.0.1', 'localhost'];

const determineScheme = (domain: string): string => {
  const [host] = domain.split(':', 2);
  if (localHosts.indexOf(host) !== -1) return 'http';
  else return 'https';
};

export const buildUrl = (path: string): string => {
  const domain = localStorage.getItem('domain') as string;
  const scheme = determineScheme(domain);
  return `${scheme}://${domain}${path}`;
};
