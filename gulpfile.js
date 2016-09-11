"use strict";

var gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    babelify = require("babelify"),
    browserify = require("browserify"),
    chalk = require("chalk"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    watchify = require("watchify"),
    merge = require("utils-merge"),
    runseq = require("run-sequence");

function mapError(err) {
    if (err.fileName) {
        $.util.log(chalk.red(err.name)
          + ": " + chalk.yellow(err.fileName.replace(__dirname + "./src/assets/js/", ""))
          + ": " + "Line " + chalk.magenta(err.lineNumber)
          + " & " + "Column " + chalk.magenta(err.columnNumber || err.column)
          + ": " + chalk.blue(err.description));
    } else {
        $.util.log(chalk.red(err.name)
          + ": "
          + chalk.yellow(err.message));
    }
}

function bundle (bundler, production) {
    return bundler.bundle()
        .on("error", mapError)
        .pipe(source("app.jsx"))
        .pipe(buffer())
        .pipe($.rename("app.min.js"))
        .pipe($.if(!production, $.sourcemaps.init({
            loadMaps: true
        })))
        .pipe($.if(!production, $.sourcemaps.write("./map")))
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest("./build/js"))
        .pipe($.if(production, $.notify({
            message: "Generated file: <%= file.relative %>"
        })))
        .on("finish", function () {
            $.util.log(chalk.blue("Browserify: Scripts successfully compiled!"))
        });
}

function transformWithBrowserify (production) {
    var prod = production ? true: false,
        args = merge(watchify.args, { debug: !prod }),
        bundler;

    if (!prod) {
        process.env.NODE_ENV = "development";

        bundler = browserify("./src/assets/js/app.jsx", args)
        .transform(babelify);

        bundler.plugin(watchify, {
            ignoreWatch: ["**/node_modules/**", "**/bower_components/**"]
        }).on("update", function () {
            bundle(bundler);
        });

        bundle(bundler, prod);
    } else {
        process.env.NODE_ENV = "production";
        
        bundler = browserify("./src/assets/js/app.jsx", args)
        .transform(babelify);
        
        return bundle(bundler, prod);
    }
}

gulp.task("clean", function () {
    return gulp.src("build")
        .pipe($.clean());
});

gulp.task("server", function () {
    $.connect.server({
        port: 1989,
        root: ["build"]
    });
});

gulp.task("sass", function () {
    return gulp.src("./src/assets/sass/app.scss")
        .pipe($.sass({
            includePaths: ["./node_modules/normalize.css"]
        }))
        .on("error", $.sass.logError)
        .pipe($.cleanCss())
        .pipe($.shorthand())
        .pipe($.autoprefixer({
            browsers: ["last 2 versions", "ie >= 9", "and_chr >= 4.0"]
        }))
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./build/css"));
});

gulp.task("eslint", function () {
    return gulp.src(["./src/assets/js/**/*.js", "./src/assets/js/**/*.jsx"])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task("minifyIndex", function () {
    return gulp.src("./src/assets/index.html")
        .pipe($.minifyHtml())
        .pipe(gulp.dest("./build"));
});

gulp.task("browserify-dev", function () {
    transformWithBrowserify();
});

gulp.task("browserify-prod", ["eslint"], function () {
    return transformWithBrowserify(true);
});

gulp.task("production", function () {
    runseq("clean", "browserify-prod", [
        "sass",
        "minifyIndex"
    ]);
});

gulp.task("dev", function (callback) {
    runseq("clean", [
        "browserify-dev",
        "sass",
        "minifyIndex"
    ], callback);
});

gulp.task("watch", ["dev"], function () {
    // Watch .scss files
    gulp.watch(["./src/assets/sass/**/*.scss", "!./src/assets/sass/vendor/*.scss"], ["sass"]);

    // Watch index.html file
    gulp.watch("./src/assets/index.html", ["minifyIndex"]);
});