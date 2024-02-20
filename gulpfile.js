const { watch, src, dest, parallel, series } = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const jsonToSass = require("gulp-json-data-to-sass");

function jsonCss() {
    return src("./src/_data/styles.json").pipe(
        jsonToSass({
            sass: "./src/scss/_vars.scss",
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
    watch("./src/scss/*.scss", parallel(cssTask));
    watch("./src/_data/styles.json", parallel(jsonCss));
}

exports.build = series(jsonCss, cssTask);

exports.default = series(jsonCss, parallel(cssTask, watchFiles));