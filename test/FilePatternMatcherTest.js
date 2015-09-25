'use strict';
import FilePatternMatcher from '../core/middleware/FilePatternMatcher';
let expect = require('chai').expect;
describe('FilePatternMatcher api', function () {
    let validPathPatterns = [
        'node_modules/sourcejs-react/bla/something.js',
        'node_modules/sourcejs-react/index.js'
    ];
    let invalidPathPatterns = [
        'node_modules/bla',
        'node_modules/sourcejs-react/node_modules/bla/index.js'
    ];
    let matcher = new FilePatternMatcher({
        filePaths: validPathPatterns.concat(invalidPathPatterns),
        patterns: [
            'node_modules/**',
            '**/sourcejs-react/**',
            '!**/sourcejs-react/node_modules/**'
        ]
    });
    it('should match files using glob', function () {
        expect(matcher.hasMatch()).to.be.true;
        expect(matcher.matchedPaths()).to.eql(validPathPatterns);
    });
});