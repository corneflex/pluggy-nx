// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'host-pluggy',
  remotes: ['plugins-plugme'],
};

module.exports = moduleFederationConfig;
