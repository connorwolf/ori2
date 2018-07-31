const gulp = require("gulp"),
	gitWatch = require("gulp-git-watch"),
	git = require("gulp-git");

gulp.task("git-watch", function() {
	gitWatch()
		.on("change", function(newHash, oldHash) {
			console.log("Found repository change from ", oldHash, "->", newHash);
			git.pull("origin", "master", (err) => {
				if (err) console.error(err);
				else console.log("Up to date.");
			});
		});
});

gulp.task("default", ["git-watch"]);