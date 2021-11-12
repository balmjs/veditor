const env = require('./env');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const workspace = path.join(__dirname, '..');

function resolve(dir) {
  return path.join(workspace, dir);
}

function getConfig(balm) {
  return {
    roots: {
      source: 'docs'
    },
    styles: {
      extname: 'scss'
    },
    scripts: {
      entry: {
        app: './docs/scripts/index.js'
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
        '@': resolve('docs/scripts'),
        vue$: 'vue/dist/vue.esm.js',
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js'
      },
      plugins: [new VueLoaderPlugin()],
      eslint: true
    },
    assets: {
      cache: env.buildDocs
    }
  };
}

module.exports = getConfig;
