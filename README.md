#Important
##To use this please make sure to install all dependencies first by typing in
### Please make sure you are in the root folder of the project folder

```
npm install
```
This will install all dependencies that are listed in the package.json file
This is just a demo and for educational purposes primarily for me but you can try and read along if you wish on how to get started with gulp.

#1. Initial Setup

#### Here we can see the initial setup of all of the basic gulp packages in their respective uses
```javascript
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
```

#2. Compiling Javascript files into one main js file
#### To run this gulp task type in
```
gulp scripts
```
### What the code above will do is it will execute it's whole callback function, along with the code inside of the callback function.
``` Javascript
//scripts
gulp.task('scripts', function() { //scripts is just a naming convention but we can call if whatever we want
  gulp.src('raw/js/*.js') //gets all of the uncompiled javascript files inside of the src/js directory
    .pipe(plumber()) //this always comes first at the pipeline
    .pipe(concat('main.min.js')) //concatenates the objects into a single file named main.min.js
    .pipe(uglify()) //minifies the code
    .pipe(gulp.dest('dist')); //sends it to a destination folder called dist
});
```

#3. Compiling SCSS/SASS files into one main css file

### Kind of the same as #.2 here we want to first find all of the scss files inside of the raw/scss folder

####To Run this gulp task type in
```
gulp stylesheets
```
```Javascript
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
```
#4. Watch Tasks
### Here want to watch for any changes inside of their respective folders for any errors which saves a ton of time and reduces alot of headache
#### to run this gulp task type in
```
gulp watch
```

```javascript
//Watch Tasks
//Watch changes inside of raw/js raw/scss files
gulp.task('watch', function() {
  gulp.watch('raw/js/*.js', ['scripts']); //watches all js changes in raw/js directory

  gulp.watch('raw/scss/**/*.scss',['stylesheets']), //watches the main or root scss file
  ('raw/scss/_mixins/**/*.scss',['stylesheets']), //watches the mixins folder for changes
  ('raw/scss/_partials-components/**/*.scss',['stylesheets']); //watches all scss changes in raw/scss/_partials-components
});
```

#5. Image Compress Task
### This task just basically compresses and removes some meta-tags in all of your images in your img folder then sends the output into your dist folder.
#### To run this gulp task type in
```
gulp image
```
``` javascript
gulp.task('image',function(){
  gulp.src('raw/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});
```

#6. Run all of your task at once
###To run all of your tasks at once make a new gulp task and name it default then compile all of your tasks names i.e scripts, stylesheets, image, watch .etc.

#### To run all tasks simply type in:
```
gulp
```

```javascript
gulp.task('default', ['scripts','stylesheets','image','watch']);
```


#### Simple as that
