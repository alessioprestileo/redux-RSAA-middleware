const gulp = require('gulp');
const babel = require('gulp-babel'); // eslint-disable-line import/no-extraneous-dependencies
const env = require('gulp-env');

const sourceFiles = ['src/middleware/RSAA/**/*'];
const destination = 'build_npm/';

gulp.task('build_npm', () => {
  const envs = env.set({
    BABEL_ENV: 'npm_build',
  });
  return gulp
    .src(sourceFiles)
    .pipe(envs)
    .pipe(babel())
    .pipe(envs.reset)
    .pipe(gulp.dest(destination));
});
