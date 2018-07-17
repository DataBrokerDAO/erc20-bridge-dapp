export default function() {
  const config: any = {};
  [
    'HOME_URL',
    'FOREIGN_URL',

    'HOME_BRIDGE',
    'FOREIGN_BRIDGE',

    'HOME_TOKEN',
    'FOREIGN_TOKEN'
  ].forEach(key => {
    config[key] = process.env['REACT_APP_' + key];
  });
  return config;
}
