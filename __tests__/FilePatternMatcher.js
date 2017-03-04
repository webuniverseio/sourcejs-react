'use strict';
import FilePatternMatcher from '../core/middleware/FilePatternMatcher';
describe('FilePatternMatcher api', () => {
	it('should match files using glob', () => {
		const validPathPatterns = [
			'node_modules/sourcejs-react/bla/something.js',
			'node_modules/sourcejs-react/index.js'
		];
		const invalidPathPatterns = [
			'node_modules/bla',
			'node_modules/sourcejs-react/node_modules/bla/index.js'
		];
		const matcher = new FilePatternMatcher({
			filePaths: validPathPatterns.concat(invalidPathPatterns),
			patterns: [
				'node_modules/**',
				'**/sourcejs-react/**',
				'!**/sourcejs-react/node_modules/**'
			]
		});
		expect(matcher.hasMatch()).toBe(true);
		expect(matcher.matchedPaths()).toEqual(validPathPatterns);
	});

	it('should match files on windows', () => {
		const filePaths = [
			'b\\c\\d.js',
			'C:\\a\\b\\c\\d.js',
			'C:\\a\\b\\c\\e.js',
			'C:\\a\\f\\c\\d.js',
			'C:\\a\\f\\c\\g.js'
		];
		const matcher = new FilePatternMatcher({
			filePaths,
			patterns: ['**/b/**/*.js']
		});
		expect(matcher.hasMatch()).toBe(true);
		expect(matcher.matchedPaths()).toEqual(filePaths.slice(0, 3));
	});
});