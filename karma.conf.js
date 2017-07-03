/* cSpell:disable */
module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "spec/**/*.ts" },
            { pattern: "src/**/*.ts" },
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
        },
        compilerOptions: {
            sourceMap: true
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"],
        plugins: [
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-typescript"
        ],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    });
    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};