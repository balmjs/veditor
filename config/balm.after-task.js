const gulp = require('gulp');
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const env = require('./env');
const uEditorCoreConfig = require('./editor');
const uEditorParseConfig = require('./editor.parse');

function buildEditorCore() {
  return gulp
    .src(uEditorCoreConfig.map((file) => `./ueditor/_src/${file}`))
    .pipe(replace('/_css/', '/css/'))
    .pipe(replace('ueditor', 'veditor'))
    .pipe(concat('veditor.js'))
    .pipe(
      iife({
        useStrict: false
      })
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('veditor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
}

function buildEditorParse() {
  return gulp
    .src(uEditorParseConfig.map((file) => `./ueditor/_parse/${file}`))
    .pipe(concat('veditor.parse.js'))
    .pipe(
      iife({
        useStrict: false
      })
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('veditor.parse.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
}

gulp.task('build:editor:core', buildEditorCore);
gulp.task('build:editor:parse', buildEditorParse);
gulp.task(
  'build:editor',
  gulp.parallel('build:editor:core', 'build:editor:parse')
);

module.exports = (balm) => {
  const useBuild = balm.config.env.isProd && !env.buildDocs;

  return useBuild ? 'build:editor' : '';
};
