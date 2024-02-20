const { watch, src, dest, parallel, series } = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const jsonToSass = require("gulp-json-data-to-sass");

function jsonColorCss() {
    return src("./src/_data/styles.json").pipe(
        jsonToSass({
            sass: "./src/scss/vars/_color.scss",
            separator: "",
        })
    );
}
function jsonSizingCss() {
    return src("./src/_data/sizing.json").pipe(
        jsonToSass({
            sass: "./src/scss/vars/_sizing.scss",
            separator: "",
        })
    );
}
function jsonTypographyCss() {
    return src("./src/_data/typography.json").pipe(
        jsonToSass({
            sass: "./src/scss/vars/_typography.scss",
            separator: "",
        })
    );
}
function cssTask() {
    return src("./src/scss/*.scss", { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }))
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./_site/static/css/"));
}

function watchFiles() {
    watch("./src/scss/**/*.scss", parallel(cssTask));
    watch("./src/_data/styles.json", parallel(jsonColorCss));
    watch("./src/_data/sizing.json", parallel(jsonSizingCss));
    watch("./src/_data/typography.json", parallel(jsonTypographyCss));
}

exports.build = series(jsonColorCss,jsonSizingCss,jsonTypographyCss, cssTask);

exports.default = series(jsonColorCss,jsonSizingCss,jsonTypographyCss, parallel(cssTask, watchFiles));