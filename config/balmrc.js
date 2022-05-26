const env = require('./env');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const workspace = path.join(__dirname, '..');

function resolve(dir) {
  return path.join(workspace, dir);
}

function getConfig(balm) {
  const useBuild = balm.config.env.isProd && !env.buildDocs;

  return {
    // useDefaults: !useBuild,
    roots: {
      source: 'app'
    },
    styles: {
      extname: 'scss'
    },
    scripts: {
      eslint: true,
      entry: {
        app: './app/scripts/index.js'
      },
      loaders: [
        {
          test: /\.md$/,
          use: ['html-loader', 'markdown-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ],
      urlLoaderOptions: {
        esModule: false
      },
      alias: {
        '@': resolve('app/scripts'),
        vue$: 'vue/dist/vue.esm.js',
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js'
      },
      plugins: [new VueLoaderPlugin()]
    },
    assets: {
      cache: env.buildDocs
    }
  };
}

module.exports = getConfig;
