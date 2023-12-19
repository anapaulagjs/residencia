"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/StartBootstrap/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  // ... rest of the browserSync function
}

// BrowserSync reload
function browserSyncReload(done) {
  // ... rest of the browserSyncReload function
}

// Clean vendor
function clean() {
  // ... rest of the clean function
}

// Modules task
function modules() {
  // ... rest of the modules function
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init()) // Initialize sourcemap
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }).on("error", sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./')) // Write sourcemap
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src(['./js/*.js', '!./js/*.min.js'])
    .pipe(sourcemaps.init()) // Initialize sourcemap
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./')) // Write sourcemap
    .pipe(gulp.dest('./js'))
    .pipe(browsersync.stream());
}

// Optimize Images
function optimizeImages() {
  return gulp
    .src("./images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
}

// Watch files
function watchFiles() {
  // ... rest of the watchFiles function
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js, optimizeImages)); // Added optimizeImages here
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.optimizeImages = optimizeImages; // Exporting the new image optimization task

