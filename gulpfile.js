// gulpプラグインの読み込み
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');

// style.scssをタスクを作成する
gulp.task('default', () => {
	// style.scssファイルを取得
	return gulp.watch('./src/scss/style.scss', () => {
		return (
			gulp
				.src('./src/scss/style.scss')
				// Sassのコンパイルを実行
				.pipe(sass())
				// Sassのコンパイルエラーを表示
				// (これがないと自動的に止まってしまう)
				.pipe(
					plumber({
						errorHandler: notify.onError('<%= error.message %>'),
					})
				)
				// cssフォルダー以下に保存
				.pipe(gulp.dest('./dist/css/'))
		);
	});
});

// function server(done) {
// 	browserSync.init({
// 		server: {
// 			baseDir: 'src',
// 		},
// 	});
// 	done();
// }

const minifyHTML = () => {
	return gulp.watch('./src/*.html', () => {
		return gulp
			.src('./src/*.html') // 元のHTMLファイルの場所
			.pipe(htmlmin({ collapseWhitespace: true })) // minifyオプション
			.pipe(gulp.dest('dist')) // 出力先のフォルダ
			.pipe(browserSync.stream()); // ブラウザをリロード
	});
};
exports.minifyHTML = minifyHTML;

function updateCssPath() {
	return gulp.watch('./src/*.html', () => {
		return gulp
			.src('./dist/index.html') // HTMLファイルのパスをdistフォルダから指定
			.pipe(replace('./scss/style.scss', './css/style.css')) // パスの置換
			.pipe(gulp.dest('./dist')); // 出力先のフォルダ
	});
}

exports.updateCssPath = updateCssPath;
