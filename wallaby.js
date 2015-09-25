//jshint node: true
'use strict';

var babel = require('babel');
module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'node_modules/minimatch/minimatch.js', instrument: false},
            {pattern: 'core/**/*.js'}
        ],
        tests: [
            {pattern: 'test/**/*Test.js', load: true}
        ],
        env: {
            // use 'node' type to use node.js
            type: 'node',

            // if runner property is not set, then wallaby.js embedded node.js version is used
            // you can specifically set the node version by specifying 'node' (or any other command)
            // that resolves your default node version, or just specify the path
            // to your node installation, like

            // runner: 'node'
            // or
            // runner: 'path to the desired node version'

            params: {
                // node flags
                //runner: '--harmony --harmony_arrow_functions',
                // env vars
                //env: 'PARAM1=true;PARAM2=false'
            }
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: babel,
                // https://babeljs.io/docs/usage/experimental/
                stage: 0
            })
        },
        delays: {
            edit: 1000
        },
        debug: true
    };
};