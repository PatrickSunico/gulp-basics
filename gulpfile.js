//require Gulp packages
var gulp = require("gulp"),
    uglify = require("gulp-uglify"), //gulp plugin that minifies javascript code
    concat = require("gulp-concat"), //gulp plugin that concatenates javascript code into one file
    sass = require("gulp-sass"), //compiles scss to css
    rename = require("gulp-rename"), // renames files
    plumber = require("gulp-plumber"), //resumes watch changes if an error occurs // note plumber should always be first below gulp.src
    livereload = require("gulp-livereload"), //live reloads on change
    imagemin = require("gulp-imagemin"),//compress image files
    prefix = require("gulp-autoprefixer"); //auto prefixes vendor prefixes i.e -webkit- -moz- -o- etc.

//scripts
gulp.task('scripts', function() {
  gulp.src('raw/js/*.js') //gets all of the uncompiled javascript files inside of the src/js directory
    .pipe(plumber()) //this always comes first at the pipeline
    .pipe(concat('main.min.js')) //concatenates the objects into a single file named main.js
    .pipe(uglify()) //minifies the code
    .pipe(gulp.dest('dist')); //sends it to a destination folder called dist
});

//stylesheets
//compiles scss into a css minified file
// var outputstyle = {outputStyle :'compressed'};
gulp.task('stylesheets', function() { // default build name //gulp stylesheets
  return gulp.src('raw/scss/*.scss') //gets all uncompiled scss files
    .pipe(plumber()) //this always comes first at the pipeline
    .pipe(sass({outputStyle: 'expanded'})) //compile all sass files to css into a minified file
    .pipe(prefix('last 2 versions'))
    .pipe(rename('main.min.css')) //rename the minified css file
    .pipe(gulp.dest('dist')); // sends it to raw/css into an unminified css
});

//Image Compress task
gulp.task('image',function(){
  gulp.src('raw/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});

//Watch Tasks
//Watch changes inside of raw/js raw/scss files
gulp.task('watch', function() {
  gulp.watch('raw/js/*.js', ['scripts']); //watches all js changes in raw/js directory
  gulp.watch('raw/scss/**/*.scss',['stylesheets']), //watches the main scss file
  ('raw/scss/_mixins/**/*.scss',['stylesheets']), //watches the mixins folder
  ('raw/scss/_partials-components/**/*.scss',['stylesheets']); //watches all scss changes in raw/scss/_partials-components
});

//Default gulp task run all tasks at once
gulp.task('default', ['scripts','stylesheets','image','watch']);
