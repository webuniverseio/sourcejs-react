'use strict';

require('node-jsx').install({extension: '.jsx', harmony: true});
var React = require('react/addons');
var JSXTransformer = require('react/dist/JSXTransformer');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

/*
 * Get html from response and parse react markup
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
exports.process = function (req, res, next) {
    if (req.specData && req.specData.isJsx) {
        _.each(require.cache, function cleanAllJsxReferences(cacheObj, key) {
            if (path.extname(key) === '.jsx') {
                delete require.cache[key];
            }
        });
        var pathToFile = path.join(global.app.get('user'), req.url);
        var html;
        try {
            var matchingPattern = /<SourceExample((?:.|\n)*?)>\s*((?:.|\n)+?)\n\s*?<\/SourceExample>/g;
            //noinspection HtmlUnknownAttribute
            var replacementPattern = '<code className="src-html source_visible">{`$2`}</code>' +
                '<SourceExample$1>$2</SourceExample>';
            var specContents = fs.readFileSync(pathToFile, {
                encoding: 'utf-8'
            }).replace(matchingPattern, replacementPattern);
            specContents = JSXTransformer.transform(specContents, {
                harmony: true
            }).code;
            var component = React.createFactory(requireCode(specContents, pathToFile));
            html = getHtml(component);
        } catch (ex) {
            html = getErrorAsHtml(ex);
        }
        req.specData.renderedHtml = html;
    }

    next();
};

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
        return React.renderToString(component({}));
    } catch(ex) {
        return getErrorAsHtml(ex);
    }
}

function getErrorAsHtml(ex) {
    if (global.MODE !== 'development') {
        console.error(ex);
        return 'Server error';
    }

    var error = React.createFactory(require('./error.jsx'));
    return React.renderToString(error({
        stack: ex.stack
    }));
}
