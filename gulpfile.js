const {watch, src, dest, parallel, series} = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const jsonToSass = require("gulp-json-data-to-sass");
var concat = require('gulp-concat');
var jsontosass = require("jsontosass");
var jsonSass = require('gulp-json-sass');

// const markdown = require("gulp-markdown");



function jsonFonts() {
    // return src("./src/_data/upload_fonts.json")
    //     .pipe(jsonSass({
    //         sass: true
    //     }))
    //     .pipe(concat('./src/scss/fonts/_font.scss'))




    return src("./src/_data/upload_fonts.json").pipe(
        jsonToSass({
            sass: "./src/scss/fonts/_font.scss",
            prefix: '',
            suffix: '',
            separator: ''
        })
    );





}



function jsonColorCss() {
    return src("./src/_data/styling/colors/colors.json").pipe(
        jsonToSass({
            sass: "./src/scss/vars/_color.scss",
            separator: "",
        })
    );
}

function jsonSizingCss() {
    return src("./src/_data/styling/sizing/sizing.json").pipe(
        jsonToSass({
            sass: "./src/scss/vars/_sizing.scss",
            separator: "",
        })
    );
}

function jsonTypographyCss() {
    return src("./src/_data/styling/typography/*.json")
        .pipe(
            jsonToSass({
                sass: "./src/scss/vars/_typography.scss",
                prefix: '',
                suffix: '',
                separator: ''
            })
        )
}

function cssTask() {
    return src("./src/scss/*.scss", {allowEmpty: true})
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}))
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./_site/static/css/"));
}

function jsTask() {
    return src('./src/static/js/*.js', {sourcemaps: true})
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./_site/static/js/"));
}


function watchFiles() {



    watch("./src/scss/**/*.scss", parallel(cssTask));
    // watch("./src/_data/styling/colors/upload_fonts.json", parallel(jsonFonts));
    watch("./src/_data/styling/colors/colors.json", parallel(jsonColorCss));
    watch("./src/_data/styling/sizing/sizing.json", parallel(jsonSizingCss));
    watch("./src/_data/styling/typography/*.json", parallel(jsonTypographyCss));
    watch("./src/static/js/*.js", parallel(jsTask));
}

exports.build = series(jsonColorCss, jsonSizingCss, jsonTypographyCss, jsTask, cssTask);

exports.default = series(jsonColorCss, jsonSizingCss, jsonTypographyCss, parallel(cssTask, jsTask, watchFiles));