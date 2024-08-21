const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

// Инициализация gulp-sass с компилятором dartSass

const server = browserSync.create();

// Задача для запуска сервера
gulp.task('server', function() {
    server.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/*.html').on('change', server.reload);
});

// Задача для компиляции стилей
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(server.stream());
});

// Задача для отслеживания изменений в файлах стилей
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch("src/*.html").on("change", gulp.parallel("html"));
	gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
	gulp.watch("src/fonts/**/*").on("change", gulp.parallel("fonts"));
	gulp.watch("src/icons/**/*").on("change", gulp.parallel("icons"));
	gulp.watch("src/img/**/*").on("change", gulp.parallel("images"));
});

gulp.task("html", function () {
	return gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

gulp.task("fonts", function () {
	return gulp
		.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(browserSync.stream());
});

gulp.task("icons", function () {
	return gulp
		.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"))
		.pipe(browserSync.stream());
});
gulp.task("images", function () {
	return gulp
		.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(browserSync.stream());
});

// Задача по умолчанию, запускающая сервер, стили и отслеживание изменений
gulp.task('default', 
	gulp.parallel(
		'server',
		gulp.series(
			'styles', 
			'scripts',
			'fonts',
			'icons',
			'html',
			'images'
		),
		'watch'
	)
);