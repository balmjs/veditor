const gulp = require('gulp');
const env = require('./env');

function copyEditorToApp() {
  return gulp.src('dist/**/*').pipe(gulp.dest('./docs/veditor'));
}

gulp.task('copy:editor2app', copyEditorToApp);

module.exports = (balm) => {
  return balm.config.env.isDev ? 'copy:editor2app' : '';
};
