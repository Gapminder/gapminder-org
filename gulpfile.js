'use strict';

const gulp = require('gulp');

const gitignore = require('gitignore-to-glob')();

gitignore.push('**/*.ts');

// Code linting
const tslint = require('gulp-tslint');

gulp.task('tslint', () =>
  gulp.src(gitignore)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: true,
      summarizeFailureOutput: true,
      reportLimit: 50
    }))
);

gulp.task('default', ['tslint']);

