module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		bump: {
			options: {
				files: ["package.json"],
				updateConfigs: [],
				commit: true,
				commitMessage: "Release v%VERSION%",
				commitFiles: ["-a"],
				createTag: true,
				tagName: "v%VERSION%",
				tagMessage: "Version %VERSION%",
				push: true,
				pushTo: "origin",
				gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
				globalReplace: false,
				prereleaseName: false,
				metadata: "",
				regExp: false
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-bump");

	// Default task(s).
	grunt.registerTask("default", ["bump"]);
};
