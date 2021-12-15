const env = require('./env');

module.exports = (mix) => {
  if (env.buildDocs) {
    //
  } else {
    if (mix.env.isProd) {
      mix.remove('dist');
      ['dialogs', 'lang', 'themes', 'third-party'].forEach((dir) => {
        mix.copy(`ueditor/${dir}/**/*`, `dist/${dir}`);
      });

      mix.copy('ueditor/ueditor.config.js', 'dist', {
        rename: {
          basename: 'veditor',
          suffix: '.config'
        }
      });

      mix.remove('dist/themes/default/_css');
      mix.css('ueditor/themes/default/_css/ueditor.css', 'dist');
      mix.copy('dist/ueditor.css', 'dist/themes/default/css', {
        rename: {
          basename: 'veditor'
        }
      });
      mix.remove('dist/ueditor.css');
    } else {
      mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts'); // For new fonts updated
    }
  }
};
