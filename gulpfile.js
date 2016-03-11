'use strict';

const fs = require('fs');
const gulp = require('gulp');
const s3 = require('gulp-s3');

gulp.paths = {
  tssrc: [
    '**/*.ts',
    '!node_modules/**/*',
    '!bundles/**/*',
    '!typings/**/*',
    '!**/*.{ts,coffee}.js']
};

// Code linting
const tslint = require('gulp-tslint');

const paths = gulp.paths;

gulp.task('tslint', () =>
  gulp.src(paths.tssrc)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: true,
      reportLimit: 0
    }))
);

// gulp default task
gulp.task('default', () => gulp.start('tslint'));

gulp.task('deploy', () => {
  fs.readFile('./aws.json', (error, s3Credentials) => {
    if (error) {
      throw error;
    }
    gulp.src('./dist/**').pipe(s3(JSON.parse(s3Credentials)));
  });
});
