var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(eslint())
  .pipe(eslint.format())
});

gulp.task('babel', function () {
  return gulp.src('src/index.jsx')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('lint_watch', function(){
  gulp.watch('src/index.jsx', ['lint']);
});

gulp.task('build', ['babel']);
