var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
sass.compiler = require('node-sass');


var paths = {
    styles: {
      src: 'src/css/style.scss',
      dest: 'dist'
    }
  };



gulp.task("sass", function() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCSS({
                compatibility: 'ie8'
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
});

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
});


gulp.task("fonts", function() {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
});


gulp.task("images", function() {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imgs"))
});

gulp.task("watch", function() {

    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch(paths.styles.src, gulp.series("sass"))
    gulp.watch("src/index.html", gulp.series("html")).on("change", browserSync.reload)
    gulp.watch("src/fonts/*", gulp.series("fonts"))
    gulp.watch("src/img/*", gulp.series("images"))
});


gulp.task('default', gulp.series("html", "sass","fonts","images", "watch"));

