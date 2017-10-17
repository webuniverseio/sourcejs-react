'use strict';
var isProduction = global.MODE !== 'development';
var options = global.opts.plugins && global.opts.plugins.react ? global.opts.plugins.react : {};
var babelOptions = getBabelOptions();
require('babel/register')(babelOptions);
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var eol = require('eol');
var FilePatternMatcher = require('./FilePatternMatcher');

function getBabelOptions() {
    var babelOptions = options.babel || {
                ignore: /.*/,
                only: [
                    '**/user/specs/**'
                ]
            };
    babelOptions.only = babelOptions.only || [];
    return babelOptions;
}

/*
 * Get html from response and parse react markup
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
exports.process = function (req, res, next) {
    if (isValidSpecType(req)) {
        cleanCacheInDevMode();
        var pathToFile = path.join(global.app.get('user'), req.path);

        var html;
        try {
            var matchingPattern = /<SourceExample((?:.|\n)*?)>\s*((?:.|\n)+?)\n\s*?<\/SourceExample>/g;
            //noinspection HtmlUnknownAttribute
            var replacementPattern = '<code className="src-html source_visible">{`$2`}</code>' +
                '<SourceExample$1>$2</SourceExample>';
            var specContents = eol.lf(fs.readFileSync(pathToFile, {
                encoding: 'utf-8'
            })).replace(matchingPattern, replacementPattern);
            specContents = babel.transform(specContents, babelOptions).code;
            var component = React.createFactory(requireCode(specContents, pathToFile));
            html = getHtml(component);
        } catch (ex) {
            html = getErrorAsHtml(ex);
        }
        req.specData.renderedHtml = html;
    }

    next();
};

function isValidSpecType(req) {
    return req.specData && (req.specData.isJsx || req.specData.isJs);
}

function cleanCacheInDevMode() {
    if (!isProduction) {
        cleanCache();
    }
}

function cleanCache() {
    _.each(require.cache, function cleanReferences(cacheObj, key) {
        var pathMatcher = new FilePatternMatcher({
            filePaths: [key],
            patterns: options.refreshCachePatterns || ['**/*.js']
        });

        if (pathMatcher.hasMatch()) {
            delete require.cache[key];
        }
    });
}

function requireCode(code, pathToCode) {
    var path = require('path');
    var Module = require('module').Module;

    var filepath = path.resolve(process.cwd(), pathToCode);
    var dirname = path.dirname(filepath);

    var cachedModule = Module._cache[filepath];
    if (cachedModule) {
        return cachedModule.exports;
    }

    var mod = new Module(filepath, module);
    Module._cache[filepath] = mod;

    mod.filename = filepath;
    mod.paths = Module._nodeModulePaths(dirname);

    mod._compile(code, filepath);
    mod.loaded = true;

    return mod.exports;
}

function getHtml(component) {
    try {
        return ReactDOMServer.renderToString(component({}));
    } catch(ex) {
        return getErrorAsHtml(ex);
    }
}

function getErrorAsHtml(ex) {
    if (isProduction) {
        console.error(ex);
        return 'Server error';
    }

    var error = React.createFactory(require('./error.js'));
    return ReactDOMServer.renderToString(error({
        stack: ex.stack
    }));
}
